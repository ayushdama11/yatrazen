# Build stage
# CACHE BUSTER: 2025-11-16-13:35 - Force complete rebuild with fixed Firebase paths
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace

# Add build arg to bust cache when needed
ARG CACHEBUST=2025-11-16-13:35

# copy pom and download dependencies (leverage layer caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# copy source
COPY src ./src

# CRITICAL: Force a complete clean build - remove any cached compiled classes
# Timestamp: 2025-11-16-13:35 - Firebase path fix deployed
RUN rm -rf target/* && mvn clean package -DskipTests -B -U -X

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
