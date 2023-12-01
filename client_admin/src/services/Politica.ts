import { PoliticaItem as PoliticaItemType, Politica as PoliticaType } from "../types/politica";

class Politica {
  async getPoliticas(): Promise<PoliticaItemType[]> {
    const politicas: PoliticaItemType[] = [
      {
        data: new Date().toISOString(), 
        id: '123', 
        titulo: 'Lorem ipsum'
      },
      {
        data: new Date().toISOString(), 
        id: '456', 
        titulo: 'Lorem ipsum 2'
      },
      {
        data: new Date().toISOString(), 
        id: '789', 
        titulo: 'Lorem ipsum 3'
      },
      {
        data: new Date().toISOString(), 
        id: '112233', 
        titulo: 'Lorem ipsum 4'
      },
    ]
    return politicas;
  }

  async getPolitica(id: string): Promise<PoliticaType> {
    console.log('service', id)
    const politica: PoliticaType = {
      data: new Date().toISOString(), 
      id: '123', 
      titulo: 'Lorem ipsum',
      texto: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed viverra erat. Fusce tincidunt metus id lectus aliquet, ut molestie erat congue. Ut sed ante et nibh porta accumsan. Donec quis sem ac sem volutpat vestibulum eu a nunc. Nulla at turpis ultrices enim condimentum pellentesque faucibus sit amet justo. Ut pretium diam a justo viverra, sed lacinia sem porta. Nunc quis elementum tellus, sit amet semper orci. Aliquam sed metus quis est efficitur sollicitudin. Morbi fermentum pellentesque diam faucibus pretium. Aliquam id dui et dui mollis ultrices et eu turpis. Mauris eleifend enim id mi ornare, a feugiat tellus posuere.
      `
    }
    return politica;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Politica();