(function(){
    //credit to Christain Nwamba
    Date.prototype.yyyymmdd = function() {
        let month = this.getMonth() + 1;
        let day = this.getDate();
    
        return [this.getFullYear(),
                (month>9 ? '' : '0') + month,
                (day>9 ? '' : '0') + day
              ].join('-');
    };

    const app = {
        url:'https://api.meetup.com/2/open_events?',
        key:'', //add your API Key here.
        sign: true,
        page:   30,
        country: 'ng',
        city: 'Lagos',
        category: 34,
        template : document.querySelector('.template')
    }
    const api = `${app.url}key=${app.key}&sign=${app.sign}&photo-host=public&country=${app.country}&city=${app.city}&category=${app.category}`;

    fetch(api)
    .then(response => response.json())
    .then(function(response){
        document.querySelector('.loader').classList.remove('loader');
        showEvent(response.results);
    }).catch(function(err){
        console.log(err);
        document.querySelector('.loader').classList.remove('loader');
    })
    const convertDate = {
        eventDate: function(timeStamp){
            //converts and return a regular date
            const eventDate = new Date(timeStamp);
            return eventDate.yyyymmdd();
        },
        eventTime: function(timeStamp){
            //converts and return a regular time
            const eventTime = new Date(timeStamp);
            const normalTime = eventTime.getHours() + ' : 0' + eventTime.getMinutes();
            return normalTime; 
        }
    }

    const showEvent = (data) => {
        data.length ? '' : document.querySelector('.empty').textContent= `No Upcoming Event in ${app.city} :)`;
        const eventList = document.querySelector('.list-group');
        for(let i = 0; i < data.length; i++){
            const event = data[i];
            eventList.appendChild(createEvent(event));
        }
    }

    const createEvent = (event) => {
        const template = app.template.cloneNode(true);
        template.classList.remove('template');
        template.querySelector('a').setAttribute('href', event.event_url)
        template.querySelector('a').setAttribute('target', '_blank');
        template.querySelector('.group-name').textContent = event.group.name;
        template.querySelector('.event-date').textContent = convertDate.eventDate(event.time);
        template.querySelector('.event-name').textContent = event.name;
        template.querySelector('.venue-name').textContent = (event.venue)? `${event.venue.name}, ${event.venue.city}`: 'Not Specified';
        template.querySelector('.event-time').textContent = convertDate.eventTime(event.time);
        return template;
    }

})()

