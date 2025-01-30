import React, {useEffect, useState} from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { SelectBudgetOptions, SelectTravelsList } from '../constants/options';
import { AI_PROMPT } from '../constants/options';
import { chatSession } from '../service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '../service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY; 

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();   // for navigating to the view-trip page

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleInputChange = (name,value)=>{
    if(name=='noOfDays' && value>5) {
      console.log("Please enter Trip Days less than 5")
      return;
    }
    setFormData({
      ...formData,
      [name] : value
    })
  }

  useEffect(()=>{
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error('Login Failed:', error),
  })

  const onGenerateTrip=async ()=>{

    const user = localStorage.getItem('user');
    if(!user) {
      setOpenDialog(true)
      return;
    }

    if(formData?.noOfDays>5 && !formData?.location || !formData?.budget || !formData.traveler) {
      toast("Please fill all the details !!")
      return;
    }

    setLoading(true);

    // after user clicks on the generate trip button - update prompt
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}',formData?.location?.label)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}',formData?.noOfDays)

    console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);

    SaveAiTrip(result?.response?.text());

  }

  const SaveAiTrip = async(TripData)=>{
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripdata:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false);

    navigate('/view-trip/' + docId);
  }

  const GetUserProfile = (tokenInfo) => {
    console.log("Token Info: ", tokenInfo);
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log("User Info: ", resp.data);  // Added .data to access the response data
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 items-center w-screen'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🚙🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete 
            apiKey={apiKey} 
            selectProps = {{  
              place,  // stores the selected location
              onChange:(v)=>{
                setPlace(v);
                handleInputChange('location',v);
              }
            }}
          /> 
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
          <Input placeholder={'Ex.3'} type="number"
            onChange = {(e)=>handleInputChange('noOfDays',e.target.value)}
          />
        </div>
            
        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item,index)=>(
              <div key={index}
               onClick = {()=>handleInputChange('budget',item.title)}
               className={`p-4 border rounded-lg hover:shadow-lg
                ${formData?.budget==item.title && 'shadow-lg border-red-800'}
               `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelsList.map((item,index)=>(
              <div key={index}
               onClick={()=>handleInputChange('traveler', item.people)}
               className={`p-4 border rounded-lg hover:shadow-lg
                ${formData?.traveler==item.people && 'shadow-lg border-red-800'}
               `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button
         disabled={loading}
         onClick={onGenerateTrip}>
          {loading?
          (<AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />) : ('Generate Trip')}
          </Button>
      </div>
      
      <Dialog open={openDialog} onOpenChange={handleCloseDialog} > 
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <h1 className="h-8 sm:h-15 md:h-16 rounded-xl text-[#FF3B30] font-bold">yatrazen!!</h1>
            <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
            <p>Sign in to the app with google authentication securely</p>
            <Button
              disabled={loading}
              onClick={login}
              className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle  />
                Sign In With Google
              </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>


    </div>
  );
}

export default CreateTrip;
