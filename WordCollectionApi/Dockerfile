FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["WordCollectionApi/WordCollectionApi.csproj", "WordCollectionApi/"]
RUN dotnet restore "WordCollectionApi/WordCollectionApi.csproj"
COPY . .
WORKDIR "/src/WordCollectionApi"
RUN dotnet publish "WordCollectionApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "WordCollectionApi.dll"]