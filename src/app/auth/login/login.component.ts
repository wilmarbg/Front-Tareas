import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FeathericonComponent } from '../../shared/component/feathericon/feathericon.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/component/loader/loader.component';
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { SweetAlertService } from 'src/app/shared/services/alert/sweet-alert.service';
import { ModalGenericComponent } from 'src/app/component/modal-generic/modal-generic.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule, FeathericonComponent, FormsModule, ReactiveFormsModule, LoaderComponent, ModalGenericComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loading: boolean = false;
  public show: boolean = false;
  public loginForm: FormGroup;
  authService = inject(AuthService);
  emailL: string = "";
  passL: string = "";
  errorMessage: string = '';
  msjService = inject(SweetAlertService);
  showUser: boolean = false;
  dataUser: any = {
    username: "",
    email: "",
    password: "",
    codigo: ""
  };

  constructor(private fb: FormBuilder, public router: Router) {

    const userData = localStorage.getItem('user');
    if (userData?.length != null) {
      router.navigate(['/'])
    }

    this.loginForm = this.fb.group({
      email: [this.emailL, [Validators.required, Validators.email]],
      password: [this.passL, Validators.required],
    });

  }
  showPassword() {
    this.show = !this.show;
  }

  // Simple Login
  async login() {
    this.loading = true
    this.errorMessage = '';
    try
    {
      let respuesta: any = await this.authService.login(this.loginForm.value["email"], this.loginForm.value["password"]);

      if (respuesta.status === 201) {
        let user = {
          id: respuesta.body.id,
          email: respuesta.body.email,
          password: respuesta.body.password,
          name: respuesta.body.username,
          token: respuesta.body.token,
        };
        localStorage.setItem("user", JSON.stringify(user));
        //this.router.navigate(["/tareas"]);
        this.router.navigate(["/configuracion/tareas"]).then(
          () => console.log('Navigation to /tareas successful'),
          (err) => console.error('Navigation error:', err)
        );
        console.log("INFORMACION USER: ", respuesta);
      }else if (respuesta.status === 401) {
        console.log("INFORMACION USER 401: ", respuesta);

        if (respuesta.error.message.trim() === "Email no existe")
        {
          

          //if (confim)
          //{
            this.showUser = true;
          //}

          
        }
        else
        {
          this.errorMessage = "Credenciales inválidas. Por favor, intenta de nuevo.";
        }

      }

    //this.loading = false;
    }
    catch(error)
    {
      console.error("Error en la llamada al servicio:", error);
      this.errorMessage = "No se pudo conectar al servidor. Por favor, verifica tu conexión e intenta de nuevo.";
    }
    finally {
      this.loading = false;
    }

    

  }

  async save()
  {

    if (this.dataUser.username.trim() === "" || this.dataUser.email.trim() === "" || this.dataUser.password.trim() === "" || this.dataUser.codigo.trim() === "")
    {
      this.msjService.warning("Datos obligatorios","Debe de ingresar todos los campos");
      return;
    }

    const confim = await this.msjService.question("",
            `Esta seguro que los datos proporcionados son los correctos?`
          );

    if (confim)
    {

      this.loading = true;

      this.dataUser.username = this.dataUser.username.trim();
      this.dataUser.email = this.dataUser.email.trim();
      this.dataUser.password = this.dataUser.password.trim();
      this.dataUser.codigo = this.dataUser.codigo.trim();

      const resp = await this.authService.createUser(this.dataUser);

      if (resp.error) {
        this.msjService.error("","Problema al procesar la solicitud");
        this.loading = false;
        return;
      }

      this.msjService.success("","Usuario registrado con éxito, favor de Iniciar Sesión");

      //this.loginForm.patchValue({ email: resp.email });

      this.dataUser = {
        username: "",
        email: "",
        password: "",
        codigo: ""
      };

      this.showUser = false;
      this.loading = false;

    }

    

  }

  async close()
  {

    this.dataUser = {
      username: "",
      email: "",
      password: "",
      codigo: ""
    };

    this.showUser = false;

  }

}
