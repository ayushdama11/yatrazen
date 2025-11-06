# Build stage
# Updated: 2025-11-06 - Fixed Firebase config path for Render secret files
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace

# Add build arg to bust cache when needed
ARG CACHEBUST=1

# copy pom and download dependencies (leverage layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# copy source
COPY src ./src

# CRITICAL: Force a complete clean build - remove any cached compiled classes
# Build timestamp to force cache invalidation: 2025-11-06-12:00
RUN mvn clean package -DskipTests -B -U

# Runtime stage - use Debian instead of Alpine for gRPC compatibility
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# copy jar
COPY --from=build /workspace/target/backend-0.0.1-SNAPSHOT.jar ./app.jar

# Expose the port the app runs on
EXPOSE 8080

# Set default JVM options (override with env var JAVA_OPTS in Render if needed)
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Start the application
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
