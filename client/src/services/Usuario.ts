import api from "./api";
import { Usuario as UsuarioType } from '../types';

interface NewUsuarioForm {
  nome: string;
  email: string;
  senha: string;
  descricao: string;
}
interface UsuarioUpdateForm {
  nome: string;
  email: string;
  descricao: string;
}

class Usuario {
  async criar(usuario: NewUsuarioForm) {
    console.log(usuario);
  };

  async getUsuarios(): Promise<UsuarioType[]> {
    const { data } = await api.get('/usuario');
    return data.usuarios as UsuarioType[];
  }

  async getUsuario(id: number): Promise<UsuarioType> {
    return {
      id,
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      descricao: (`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a metus a enim tristique porta. Ut viverra interdum risus. Proin ac orci gravida, finibus urna fermentum, mollis arcu. Phasellus tempus ipsum suscipit volutpat bibendum. Sed varius convallis sapien, quis ultricies purus eleifend a. Nullam convallis id ante at consectetur. Aliquam ex erat, convallis ac feugiat non, pellentesque in ipsum. Donec sed varius purus. Etiam sit amet ex vel dolor egestas semper ac et neque. Duis ac leo sed leo viverra luctus nec sagittis lorem. Proin eget sapien nibh.

      Nam aliquam mauris eget lectus interdum volutpat. Aliquam bibendum est at justo sollicitudin, nec accumsan mi sollicitudin. Etiam imperdiet imperdiet ex lacinia scelerisque. Quisque molestie dolor id risus tristique, eu mattis lacus suscipit. Maecenas quis ipsum at ipsum faucibus laoreet et varius mi. In hac habitasse platea dictumst. Vivamus venenatis nunc nisi, id pharetra enim condimentum a. Aliquam ullamcorper, diam ac lobortis porta, tellus ipsum sagittis tortor, ut dapibus nulla quam et diam. Integer eleifend orci nulla, quis commodo diam semper sed. Nunc ultrices massa dolor, ac luctus purus fringilla ac. Sed auctor mauris ut sapien elementum, a eleifend elit convallis. Nullam rhoncus ipsum tortor, in convallis lorem egestas vel. Proin tristique purus ac malesuada tincidunt. Nulla facilisi. Fusce ac massa pretium, suscipit risus id, hendrerit lorem. Curabitur vel vulputate erat, id iaculis lacus.
      
      Proin quam libero, cursus aliquet vehicula in, sodales sed magna. Aenean tristique consectetur elit, a vestibulum lacus pharetra egestas. Duis vitae erat nec tortor convallis porttitor. Etiam sed mauris sed eros convallis lobortis. Suspendisse potenti. Nulla tincidunt diam nec tortor mattis, at ultricies nulla congue. Sed rutrum pellentesque tincidunt. Phasellus eu quam sed nisl sodales tincidunt ut a enim. Morbi velit orci, maximus at ornare eu, interdum eu tortor. Integer justo urna, tincidunt ac ullamcorper ac, volutpat a risus. Nunc sit amet mattis justo. In semper quam vel odio interdum, varius dictum lacus vulputate.`)
    };
  }

  async login(login: {email: string; senha: string}) {
    return {
      id: 333,
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      descricao: (`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a metus a enim tristique porta. Ut viverra interdum risus. Proin ac orci gravida, finibus urna fermentum, mollis arcu. Phasellus tempus ipsum suscipit volutpat bibendum. Sed varius convallis sapien, quis ultricies purus eleifend a. Nullam convallis id ante at consectetur. Aliquam ex erat, convallis ac feugiat non, pellentesque in ipsum. Donec sed varius purus. Etiam sit amet ex vel dolor egestas semper ac et neque. Duis ac leo sed leo viverra luctus nec sagittis lorem. Proin eget sapien nibh.

      Nam aliquam mauris eget lectus interdum volutpat. Aliquam bibendum est at justo sollicitudin, nec accumsan mi sollicitudin. Etiam imperdiet imperdiet ex lacinia scelerisque. Quisque molestie dolor id risus tristique, eu mattis lacus suscipit. Maecenas quis ipsum at ipsum faucibus laoreet et varius mi. In hac habitasse platea dictumst. Vivamus venenatis nunc nisi, id pharetra enim condimentum a. Aliquam ullamcorper, diam ac lobortis porta, tellus ipsum sagittis tortor, ut dapibus nulla quam et diam. Integer eleifend orci nulla, quis commodo diam semper sed. Nunc ultrices massa dolor, ac luctus purus fringilla ac. Sed auctor mauris ut sapien elementum, a eleifend elit convallis. Nullam rhoncus ipsum tortor, in convallis lorem egestas vel. Proin tristique purus ac malesuada tincidunt. Nulla facilisi. Fusce ac massa pretium, suscipit risus id, hendrerit lorem. Curabitur vel vulputate erat, id iaculis lacus.
      
      Proin quam libero, cursus aliquet vehicula in, sodales sed magna. Aenean tristique consectetur elit, a vestibulum lacus pharetra egestas. Duis vitae erat nec tortor convallis porttitor. Etiam sed mauris sed eros convallis lobortis. Suspendisse potenti. Nulla tincidunt diam nec tortor mattis, at ultricies nulla congue. Sed rutrum pellentesque tincidunt. Phasellus eu quam sed nisl sodales tincidunt ut a enim. Morbi velit orci, maximus at ornare eu, interdum eu tortor. Integer justo urna, tincidunt ac ullamcorper ac, volutpat a risus. Nunc sit amet mattis justo. In semper quam vel odio interdum, varius dictum lacus vulputate.`)
    };
  }

  async delete(id: number) {
    console.log('exlcuindo ', id);
  }

  async update(id: number, usuario: UsuarioUpdateForm) {
    console.log('foi');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Usuario();