export class Movie{
    id : number;
    title : string;
    original_title : string;
    poster_path : string;// (foto)
    overview : string;
    release_date : Date;
    vote_average : number;
    vote_count : number;

    constructor(id : number, title: string, original_title : string, poster_path : string, overview : string, release_date : Date, vote_average : number, vote_count : number){
        this.id = id;
        this.title = title;
        this.original_title = original_title;
        this.poster_path = poster_path;
        this.overview = overview;
        this.release_date = release_date;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
    }
}