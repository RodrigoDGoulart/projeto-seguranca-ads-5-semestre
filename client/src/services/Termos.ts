import { Termo as TermoType} from "../types/termo";

class Termo {
  async getLastTerm(): Promise<TermoType> {
    return {
      id: '123123',
      data: new Date().toISOString(),
      termo: (`
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a metus a enim tristique porta. Ut viverra interdum risus. Proin ac orci gravida, finibus urna fermentum, mollis arcu. Phasellus tempus ipsum suscipit volutpat bibendum. Sed varius convallis sapien, quis ultricies purus eleifend a. Nullam convallis id ante at consectetur. Aliquam ex erat, convallis ac feugiat non, pellentesque in ipsum. Donec sed varius purus. Etiam sit amet ex vel dolor egestas semper ac et neque. Duis ac leo sed leo viverra luctus nec sagittis lorem. Proin eget sapien nibh.

      Nam aliquam mauris eget lectus interdum volutpat. Aliquam bibendum est at justo sollicitudin, nec accumsan mi sollicitudin. Etiam imperdiet imperdiet ex lacinia scelerisque. Quisque molestie dolor id risus tristique, eu mattis lacus suscipit. Maecenas quis ipsum at ipsum faucibus laoreet et varius mi. In hac habitasse platea dictumst. Vivamus venenatis nunc nisi, id pharetra enim condimentum a. Aliquam ullamcorper, diam ac lobortis porta, tellus ipsum sagittis tortor, ut dapibus nulla quam et diam. Integer eleifend orci nulla, quis commodo diam semper sed. Nunc ultrices massa dolor, ac luctus purus fringilla ac. Sed auctor mauris ut sapien elementum, a eleifend elit convallis. Nullam rhoncus ipsum tortor, in convallis lorem egestas vel. Proin tristique purus ac malesuada tincidunt. Nulla facilisi. Fusce ac massa pretium, suscipit risus id, hendrerit lorem. Curabitur vel vulputate erat, id iaculis lacus.
      `)
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Termo();