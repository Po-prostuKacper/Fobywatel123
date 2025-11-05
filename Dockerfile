# syntax=docker/dockerfile:1
FROM eclipse-temurin:22-jdk

WORKDIR /app
COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["java", "-jar", "server.jar"]
