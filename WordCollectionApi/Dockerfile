# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WordCollectionApi.csproj", "."]
RUN dotnet restore "WordCollectionApi.csproj"
COPY . .
RUN dotnet publish "WordCollectionApi.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "WordCollectionApi.dll"]