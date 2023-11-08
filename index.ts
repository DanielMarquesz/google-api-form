import path from 'path'
import * as google from '@googleapis/forms'

const genToken = async () => {

  // 1. Ativar google API Forms no GCP(necessário?)
  // 2. Criar service Account com as permissões(read, write, editor)
  // 3. Ir no serviço "credentials" => "keys" => "ADD KEY" => Assim geramos uma nova chave para autenticação.
  // 4. Utilizar o arquivo JSON


  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'luis-form.json'),
    scopes: [
      // "https://www.googleapis.com/auth/drive",
      // "https://www.googleapis.com/auth/drive.readonly",
      // "https://www.googleapis.com/auth/drive", // Para criação
      // "https://www.googleapis.com/auth/forms",
      // "https://www.googleapis.com/auth/forms.body.readonly",
      "https://www.googleapis.com/auth/forms.responses.readonly"
    ],
  })

  const formsClient = google.forms({
    version: 'v1',
    auth
  })

  // Recupera as infos do formulário criado
  // const res = await forms.forms.get({formId: '1ayiaYme7qSclE4l-0JbT_DmQ9OVXN6anMKpp5c5qjYQ',});

  // Recupera uma lista de respostas do formulário
  // const res = await formsClient.forms.responses.list({formId: '1ayiaYme7qSclE4l-0JbT_DmQ9OVXN6anMKpp5c5qjYQ'});
  //@ts-ignore
  // console.log("Question", res.data);

  const res = await formsClient.forms.responses.get({
    formId: '1ayiaYme7qSclE4l-0JbT_DmQ9OVXN6anMKpp5c5qjYQ',
    responseId: 'ACYDBNikeD2ALNdOiqx28oOO1Xsa5wkHuJ-3W3-CxrBvuozymIIGEcaaEjy0bGFWAvjxBQs'
  })

  console.log(res.data)
  const answers = res.data.answers

  for (const answ in answers) {
    if (answers[answ].textAnswers) {
      const textAnswers = answers[answ].textAnswers;
      console.log(textAnswers)
    }
  }

  // A API do google obriga a antes criar um formulário somente com o título 
  // e depois realizar o update com as perguntas
  // const req = await formsClient.forms.create({
  //   requestBody: {
  //     info: {
  //       title: "Esse é o título",
  //     },
  //   }
  // })

  // Criação das perguntas
  // const resUpdate = await formsClient.forms.batchUpdate({
  //   formId: '1ayiaYme7qSclE4l-0JbT_DmQ9OVXN6anMKpp5c5qjYQ',
  //   requestBody: {
  //     includeFormInResponse: true,
  //     requests: [
  //       {
  //         createItem: {
  //           item: {
  //             title: "Esse é o title?",
  //             description:"Description",
  //             questionItem: {
  //               question: {
  //                 required: true,
  //                 textQuestion: {
  //                   paragraph: true
  //                 }
  //               }
  //             }
  //           },
  //           location: {
  //             index: 0,
  //           }
  //         }
  //       }
  //     ],
  //     // writeControl: { // Para detectar mudanças no formulário anterior
  //     //   targetRevisionId: "",
  //     //   requiredRevisionId: ""
  //     // }
  //   }
  // })

  // console.log("UPDATED_FORM", resUpdate.data)
}

genToken().then()