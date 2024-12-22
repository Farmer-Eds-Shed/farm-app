import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonButton, IonItem, IonInput } from '@ionic/react';
import './Page.css';
import { useForm } from 'react-hook-form';
import React from "react";
import { Storage } from '@ionic/storage';

//initialize storage
const store = new Storage();
await store.create();
let url = await store.get('url');

//form variables
const SettingsPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      url: url
    }
  });

  //console.log(errors);
  //console.log(getValues());


  //farmOS Auth0 token request
const authenticate = async (data: any) => {
  const params = new URLSearchParams();

  params.append("grant_type", "password");
  params.append("username", data.username);
  params.append("password", data.password);
  params.append("client_id", "farm");
  params.append("scope", "farm_manager");

  try {
  url = await store.get('url');
  console.log(url)  
  const response = await fetch(url + "/oauth/token", {
    method: "POST",
    cache: 'no-cache',
    body: params,
    headers: {
      "Accept": "application/json",
      "content-type": "application/x-www-form-urlencoded",
    },
  })
  const receivedData = await response.json()

  console.log(receivedData)
}

  catch (error){
    console.error(error);
  }
}


  /**
   *
   * @param data
   */
  const onSubmit = (data = getValues()) => {
    store.set('url', data.url);
    authenticate(data)
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div id = "container">
          <h2>farmOS Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
              <IonInput autocomplete="url" label='url:' 
                onIonChange={(e: any) => {setValue('url', e.target.value);}}
                {...register('url', {
                  required: 'This is a required field',
                })}    
              />
            </IonItem>
            <IonItem>
              <IonInput autocomplete="username" label='Username:' 
                onIonChange={(e: any) => {setValue('username', e.target.value);}}
                {...register('username', {
                  required: 'This is a required field',
                })}    
              />
            </IonItem>
            <IonItem>
              <IonInput autocomplete="current-password" type='password' label='Password:'
                onIonChange={(e: any) => {setValue('password', e.target.value);}}
                {...register('password', {
                  required: 'This is a required field',
                })}    
              />
            </IonItem>
            <div>
              <IonButton type="submit">submit</IonButton>
            </div>
          </form>
          </div>
        </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
