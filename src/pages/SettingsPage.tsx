import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonButton, IonItem, IonInput } from '@ionic/react';
import './Page.css';
import { useForm } from 'react-hook-form';
import React, {useRef} from "react";


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
      password: ''

    }
  });

  //console.log(errors);
  //console.log(getValues());



function authenticate(data: any) {
  console.log(data)
}


  /**
   *
   * @param data
   */
  const onSubmit = (data = getValues()) => {
    //alert(JSON.stringify(data, null, 2));
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
