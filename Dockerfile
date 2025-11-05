# Używamy obrazu Javy
FROM openjdk:17-jdk-slim

# Ustaw folder roboczy w kontenerze
WORKDIR /app

# Skopiuj cały projekt do kontenera
COPY . .

# Ustaw zmienną środowiskową (Railway ustawia PORT automatycznie)
ENV PORT=8080

# Otwórz port (niezbędne)
EXPOSE 8080

# Uruchom aplikację Java
CMD ["java", "-jar", "server.jar"]
