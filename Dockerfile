# Używamy obrazu Javy (działa na Railway)
FROM eclipse-temurin:17-jdk

# Ustaw folder roboczy w kontenerze
WORKDIR /app

# Skopiuj cały projekt do kontenera
COPY . .

# Ustaw zmienną środowiskową (Railway ustawia PORT automatycznie)
ENV PORT=8080

# Otwórz port
EXPOSE 8080

# Uruchom aplikację Java
CMD ["java", "-jar", "server.jar"]
