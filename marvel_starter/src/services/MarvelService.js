class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}


    getAllCharacters= () => {
        return this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=0abdf7b5020caec37bc77aeba2994916'
            );
    }

    getCharacter= (id) => {
        return this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?limit=9&offset=210&apikey=0abdf7b5020caec37bc77aeba2994916`
            );
    }


}
export default MarvelService;