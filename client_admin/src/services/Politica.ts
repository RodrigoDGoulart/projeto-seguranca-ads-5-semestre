import { PoliticaItem as PoliticaItemType, Politica as PoliticaType } from "../types/politica";
import { UsuarioLog } from "../types/usuario";
import api from "./api";

class Politica {
  async getPoliticas(): Promise<PoliticaType[]> {
    const { data } = await api.request.get('/policies');
    console.log(data)
    return data;
  }

  async getPolitica(id: string): Promise<PoliticaType> {
    const { data } = await api.request.get(`/policies?id=${id}`);
    return data;
  }

  async getLastPolitica(): Promise<PoliticaType> {
    console.log('service las politica')
    const politica: PoliticaType = {
      data: new Date().toISOString(), 
      _id: '123', 
      titulo: 'Lorem ipsum',
      politica_privacidade: `
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

  async updatePolitica (texto: string ) {
    const data = new Date().toISOString();
    console.log('update politica', data, texto);
  }

  async getUsuarioLog (): Promise<UsuarioLog[]> {
    const lista:UsuarioLog[] = [
      {id_usuario: '123', data: new Date().toISOString(), nome_usuario: 'Fulano1'},
      {id_usuario: '123456', data: new Date().toISOString(), nome_usuario: 'Fulano2'},
      {id_usuario: '123789', data: new Date().toISOString(), nome_usuario: 'Fulano3'},
      {id_usuario: '123123', data: new Date().toISOString(), nome_usuario: 'Fulano4'},
    ]
    return lista;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Politica();