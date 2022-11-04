# **Museums@SG**

![Screenshots of Park Projector homepage](assets/screenshots/responsive-screenshots.png)

**Link to demo : [Park Projector](https://sg-museums.netlify.app/)**

## Summary
Park Projector is a park finder website for nature lovers. 

It helps people to locate the nearby parks, trails and gardens based on typing a location name. It intends to encourage people to appreciate and discover the green places in the city of Singapore. It helps people discover nearby green spaces to enjoy life in.

---

## UI/UX

The users of this app are usually busy with school or work, and would use this app for greater convenience to search for nature places to exercise. The app is designed to help them lcoate themselves, nearby park spaces and other useful amenities such as pathways or foodstops nearby. 

### User Goals
The project caters to working adults who exercise, nature hikers and cyclists. The project aim allows easy search of all the parks, gardens and hiking trails in Singapore. 

It allows them to find connecting paths and nearby places to relax and work out in. It also provides information on the weather patterns around the park so as to chart out their exercise location wisely.


### Organisational Goals
Companies like the NParks and Singapore Sports Council would encourage such apps in line with the ActiveSG initiative.


### Structure and Skeleton

![Sitemap](assets/wireframes/sitemap.jpg)

[Wireframes](assets/wireframes/wireframes.pdf)


### Design Decisions

#### Color scheme

![Screenshot of color scheme](assets/color-schemes/color-scheme.png)
The main color of the app was green because it is in line with the naturalness, beauty and serenity of nature. In a green space, people are more relaxed and they have a good backdrop to conduct their exercise activities. 

#### Fonts

The font chosen is *Roboto Slab*. This is a look that is in line with some fonts used by nature websites to keep a clean and pristine look. 
*Montserrat* is a font family that is mainly used in old posters and signs. 
---

## Functions

| Functions | Explanation |
| ----------- | ----------- |
| Search park, hiking trail, garden| This allows to search general outdoor places in Singapore to suggest to the user.|
| Search by region| This allows search based on the lown name to cater to more personalised location for the user|
| Sort search by relevance or rating| This allows user to indicate if they prefer results based on relevance or overall ratings to be reflected in their search results.|
|Display 20 or 50 results| This allows user customise more or less search results to be reflected on the screen for a more comprehensive or generic search result.|
| Drop down result list| This allows user to see the name of all the relevant nature places based on their search interest.|
| Map| This allows user to see all the location and which area of Singapore more nature places are in.|
| Map zoom on park| This allows user to see the specific location and the localised surrounding of the searched nature area.|
| Map pop up| This allows user to see the name and associated picture of the park.|
| Map zoom on park| This allows user to see the specific location and the localised surrounding of the searched nature area.|
|Weather tab| This allows user to see the weather of the current nature location.|
| Food nearby| This allows user to see the nearby food locations surrounding the nature area within a certain distance away for hungry park goers.|
|Other layers | This allows user to change look of the base map to display terrain, landscape or darkmode.|
|Other amenities layers | This allows user to display park connectors, cycling path tracks nearby, and toggle the nearby food layers on and off.|
|About SGPark | Describe to users the mission of the app.|
|Exercise figures | Encourage users to join in the movement to exercise outdoors as more people do so these days.|

---

## Limitations and Future Implementations
1. Improve on town search function 
- Search Function can only turn up accurate results for town area if the town has only one keywork(e.g. Serangoon). Whereas, search town areas like East Coast returns any nature place starting with East.
- Use nearby location tag to improve results.



2. Incorporate public transport data into search
- Only able to show MRT and bus stations on the map.
- Allow users to see pop up marker of nearest bus station and MRT station.




## Technologies Used
1. HTML
2. CSS
3. Javascript
4. [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/) 
5. [LeafletJS](https://leafletjs.com/)
   - Create map seen on Park Projector
6. [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
    - Create map clusters on the map
7. [Axios](https://github.com/axios/axios)
    - Retrieve API data from API websites
8. JSON PathFinder to analyse array for DOM


## Testing

| Test Case Number| Description |Step| Observation |
| ----------- | ----------- |----------- | ----------- |
|1. | Load park projector website|Go to the url| Page should not crash.|

|2. | Open Off Canvas bar |Click on green search button with orange dotted border|Off canvas bar should render with all the search options displayed.|

|3A. | Search park, hiking trail, garden|Select radio button of either park, hiking trail or garden| Generated result should be of the selected button showing either park, hiking trail or garden.|
|3B. |  Search by region|Key in one word input of town name like (Serangoon)| Generated result should be showing nature places within the selected town|
|3C. | Sort search by relevance or rating|Select radio button of relevance or rating| Generated result should sort results based on relevance to search or rating of search.|
|3D. | Display 20 or 50 results|Select radio button of20 or 50 results| Generated result should display up to 20 or up to 50 results on screen|


|4A. | Display Drop down result list|Click search after entering all search terms| Generated list should show the names of all the nature places|
|4B. | Zoom to Map park location|Click name of park in search result list| Map should zoomtoShow Layer park location and open up pop up of park|


|5A. | Show weather pattern at location|Click weather in offcanvas panel| Should reflect weather pattern at current park location|
|5B. | Display food nearby|Click Food Nearby in offcanvas panel, followed by Display button| Should reflect markers of nearby food location and a circle circumference to show vicinity of the current park location|
|5C. | Display name of food place|Click Food Marker on map. Note need to close offcanvas panel to do so.| Should reflect name in the popup on the food location marker.|


|6A. | Other layers |Click on other base map layers in the leaflet control panel| Should change base map layer to selected layer.|
|6B. | Display amenities layers |Click Park Connectors,Cycling path track, Show nearby Food in the leaflet control panel| Should reflect layer of amenities on the park map|

|7A. | Display About SGPark|Click  About SGPark button| Should display modal about mission of the app|
|7B. | Display Figures of people who exercise|Click  Figures button on modal| Should display webpage of two charts of people forms of exercise and frequency for regular exercise.|
|7C. | Return to map|Click  green back button on chart webpage| Should return to map display with results fully refreshed.|




Deployment
Netlify



---





## Reference and credit

### Logo :


Credits
The data for the park connectors and cycling track are from https://data.gov.sg/
Photos and search results are from foursquare.
Weather information is from openweather api (https://openweathermap.org/api).
Other basemaps are from https://leaflet-extras.github.io/leaflet-providers/preview/ 


README reference
https://github.com/e0026557/TGC-18-Project-1/blob/main/README.md 



## Deployment

The website is hosted using [Netlify](https://www.netlify.com/), deployed directly from the main branch of this Github repository.
For the detailed deployment steps, you can refer to the blog post on Netlify [here](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/).

---

## Credits and Acknowledgement

### Logo :
1. [Adobe Express Logo Maker](https://www.adobe.com/express/create/logo) - Used to generate brand logo for website

### Fonts :
1. [Google Fonts](https://fonts.google.com/) - Used for fonts displayed in website 

### Icons :
1. [Font Awesome](https://fontawesome.com/) - Used in tabs and buttons of website

2. [Flaticon](https://www.flaticon.com/) - Used in map marker icons of website


### Data :
1. [Data.gov.sg](https://data.gov.sg/) 
    - The 'Museums' dataset by National Heritage Board was used to display museum information and photos on website

2. [OpenWeather API](https://openweathermap.org/) 
    - Used to display current weather, weather forecast and icons on website

3. [Tourism Information & Services Hub (TIH) Experiential Route API](https://tih-dev.stb.gov.sg/map-api/apis/get/v1.1/experiential_route/%7Bmode%7D) 
    - Used to display navigation route between locations on map

### Screenshot :
1. [CreateMockup.com](https://www.createmockup.com/generate/) - Used to generate responsive website mockup for README file



--- 

