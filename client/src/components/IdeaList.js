import IdeasApi from "../services/ideasApi";

class IdeaList {
    constructor() {
        this._ideaListEl = document.querySelector('#idea-list');
        this.getIdeas();
        this._ideas = [];
        this._validFlags = new Set();
        this._validFlags.add('technology');
        this._validFlags.add('software');
        this._validFlags.add('business');
        this._validFlags.add('education');
        this._validFlags.add('health');
        this._validFlags.add('inventions');
    }

    addEventListeners(){
        this._ideaListEl.addEventListener('click', (e)=> {
            if(e.target.classList.contains('fa-times')) {
                e.stopImmediatePropagation();
                const ideaId = e.target.parentElement.parentElement.dataset.id;
                this.deleteIdea(ideaId);
            }
        })
    }

    async getIdeas(){
        try {
            const res = await IdeasApi.getIdeas();
            this._ideas = res.data.data;
            this.render();          
        } catch (error){
            console.log(error);
        }
    }

    async deleteIdea(ideaId){
        try{
            // Delete from server
            const res = await IdeasApi.deleteIdea(ideaId);
            this._ideas.filter((idea)=> idea._id !== ideaId);
            this.getIdeas();
        } catch(error){
            alert('You can not delete this resource');
        }
    }

    addIdeaToList(idea){
        this._ideas.push(idea);
        this.render();
    }

    getTagClass(tag) {
        tag = tag.toLowerCase();
        let tagClass = '';
        if (this._validFlags.has(tag)) {
            tagClass = `tag-${tag}`;
        } else {
            tagClass = '';
        }
        return tagClass;
    }

    render() {
        this._ideaListEl.innerHTML = this._ideas.map((idea) => {
            const tagClass = this.getTagClass(idea.tag);
            const deleteBtn = idea.username === localStorage.getItem('username') ?
            '<button class="delete"><i class="fas fa-times"></i></button>' : '';
            return `
            <div class="card" data-id="${idea._id}">
            ${deleteBtn}
            <h3>
              ${idea.text}
            </h3>
            <p class="tag ${tagClass}">${idea.tag}</p>
            <p>
              Posted on <span class="date">${idea.date.slice(0,10)}</span> by
              <span class="author">${idea.username}</span>
            </p>
          </div>
            `;
        }).join('');
        this.addEventListeners();
    }
}

export default IdeaList;