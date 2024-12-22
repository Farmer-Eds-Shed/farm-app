import { IonButton, IonItem, IonInput } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { Storage } from '@ionic/storage';

const store = new Storage();
await store.create();


const logout = async () => {
  await store.set('refreshToken', "");
  await store.set('accessToken', "");
  console.log('Logout / clear all tokens')
}


export function LoginForm({farmUrl}:any) {
  
    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { errors }
      } = useForm ({
        defaultValues: {
          username: '',
          password: '',
          url: farmUrl
        }
      });
    

      //farmOS Auth0 token request
    const authenticate = async (data: any) => {
      const params = new URLSearchParams();
    
      params.append("grant_type", "password");
      params.append("username", data.username);
      params.append("password", data.password);
      params.append("client_id", "farm");
      params.append("scope", "farm_manager");
    
      try {  
      const response = await fetch(data.url + "/oauth/token", {
        method: "POST",
        cache: 'no-cache',
        body: params,
        headers: {
          "Accept": "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      const receivedData = await response.json()
      store?.set('refreshToken', receivedData.refresh_token);
      store?.set('accessToken', receivedData.access_token);
    
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
        store?.set('url', data.url);
        authenticate(data)
      };
  
    return (
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
            <IonButton type="submit">Login</IonButton>
            <IonButton onClick={() => { logout();}}>Logout</IonButton>
          </div>
        </form>
    );
  }