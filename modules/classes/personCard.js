// PERSONCARD.JS  -- (OOP) Defines a PersonCard class to render a person's profile using OOP principles.


export class PersonCard {
    constructor(person) {
      this.name = person.name;
      this.popularity = person.popularity;
      this.department = person.known_for_department;
      this.knownFor = person.known_for;
      this.profilePath = person.profile_path;
    }
  
    render() {
        const card = document.createElement('div');
        card.classList.add('movieCard');
  
        const imgEl = document.createElement('img');
        imgEl.src = this.profilePath
        ? 'https://image.tmdb.org/t/p/w500' + this.profilePath
        : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  
        const nameEl = document.createElement('h3');
        nameEl.innerText = this.name;
    
        const popEl = document.createElement('h6');
        popEl.innerText = 'Popularity: ' + this.popularity;
    
        const deptEl = document.createElement('h6');
        deptEl.innerText = this.department;
    
        const knownMedia = document.createElement('div');
        const knownMediaTitle = document.createElement('h5');
        knownMediaTitle.innerText = 'Credits '
        knownMedia.append(knownMediaTitle);
        this.knownFor.forEach((item) => {
            const knownMediaEl = document.createElement('p');
            const title = item.title || item.name;
            knownMediaEl.innerText = `${item.media_type}: ${title}`;

            if (item.media_type === 'movie' && item.id) {
                knownMediaEl.classList.add('known-media');
                knownMediaEl.style.cursor = 'pointer';

                knownMediaEl.classList.add('clickable-card');
                knownMediaEl.dataset.id = item.id;
                knownMediaEl.dataset.type = 'movie';
            }

            knownMedia.append(knownMediaEl);
        });
    
        card.append(imgEl, nameEl, deptEl, popEl, knownMedia);
        return card;
    }
  }