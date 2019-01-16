var app = new Vue({
	el: '#app',

	data: {
		events: [],
		eventsD: [],
		eventsF: [],
		eventsC: [],
		eventsP: [],
		eventFilter: [],

		varBack: "",
		pHome: "",
		userName: "",
		email: "",
		myText: "",
		icon: false,
	},
	created: function () {
		this.getData();
		this.createEventArrays();
		this.hideSection("calendario");
		this.hideSection("cultura");
		this.hideSection("deportes");
		this.hideSection("festivo");
		this.hideSection("privado");
		this.hideSection("eventExtend");
		this.hideSection("chat");
		this.hideSection("bodyChat");
	},
	computed: {

		iconState: function () {
			console.log(this.myText);
			//condicion if que compara que el patron no encuetre espacios en blanco
			if (/\S/.test(this.myText)) {
				//			if (this.myText.test() == "" || this.myText == " ") {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		getData: function () {
			fetch("https://api.myjson.com/bins/kyhm4", {
				method: "GET",

			}).then(function (response) {
				if (response.ok) {


					return response.json();
				}

			}).then(function (json) {
				app.events = json.eventos;
				/*Funcion que oredena los eventos por fecha,accediendo al valor de la key date que es una fecha,la cual divide con "split", la empieza a comparar alrevés gracias a "reverse" y con "join" une la fecha convirtiendola en un número*/
				app.events.sort(function (a, b) {
					var aa = a.date.split('/').reverse().join(),
						bb = b.date.split('/').reverse().join();
					return aa < bb ? -1 : (aa > bb ? 1 : 0);
				});
				app.createEventArrays();
				app.hideSection();

				app.userName;
				app.email;
				app.icon;
				console.log(app.events);

			}).catch(function (error) {
				console.log("Request failed:" + error.message);
			});
		},

		/*funcion para crear arrays con los datos y poder acceder a ellos desde el HTML.Están filtrados segun su ID para porner los del mismo tipo juntos*/
		createEventArrays: function () {

			for (var i = 0; i < this.events.length; i++) {

				if (app.events[i].id == "deporte") {
					this.eventsD.push(app.events[i]);
				}
				if (app.events[i].id == "cultura") {
					this.eventsC.push(app.events[i]);
				}
				if (app.events[i].id == "festivo") {
					this.eventsF.push(app.events[i]);
				}

				if (app.events[i].id == "privado") {
					this.eventsP.push(app.events[i]);
				}

			}
			console.log(this.eventsD);
			console.log(this.eventsC);
			console.log(this.eventsF);

		},
		/*Función para ocultar de inicio los div que no quiero que se muestren*/
		hideSection: function (section) {
			var numSelect = 0;

			divSection = document.getElementById(section);
			divSection.style.display = "none";

		},
		/*función para cambiar de div sugun hagamos click en el boton que elijamos.LO que hace es cambiar el valor del atributo display,uso un parametro para hacerlo mas dinamico y que la funcion me valga para todos los div,en el HTML meteré de parametro el id del div que quiero mostrar*/
		changeDiv: function (parametro1, parametro2) {

			x = document.getElementById(parametro2);
			x.style.display = "none";

			y = document.getElementById(parametro1);
			y.style.display = "block";
			this.pHome = parametro1;
			this.eventFilter = [];

		},
		/*funcion que mostrará el div con la información completa de cada evento,para ello se rellenará un nuevo array con este evento,para ello la función tiene dos parametros que uno de ellos será el nombre del evento que lo cogerá desde el HTML y de forma dinámica ya que el valor del nombre del evento varía automaticamente.el otro parametro se pondrá dependiendo del div desde el que llamemos al vento ya que ese parametro sera el div que ocultemos para mostrar el nuevo.*/
		divExtend: function (p, p2) {

			for (var i = 0; i < this.events.length; i++) {

				if (app.events[i].nombre == p) {
					this.eventFilter.push(this.events[i])
					x = document.getElementById(p2);
					x.style.display = "none";

					y = document.getElementById("eventExtend");
					y.style.display = "block";
					this.varBack = p2;
				}
			}

		},
		login: function () {
			// https://firebase.google.com/docs/auth/web/google-signin

			// Provider
			var provider = new firebase.auth.GoogleAuthProvider();
			user = firebase.auth().currentUser;
			// How to Log In
			firebase.auth().signInWithPopup(provider);

			console.log("login");
			//funcion if para sacar datos.
			if (user != null) {
				this.userName = user.displayName;
				this.email = user.email;
				photoUrl = user.photoURL;
				emailVerified = user.emailVerified;
				uid = user.uid;

			}
			if (this.userName != null) {
				y = document.getElementById("botonEntrar");
				y.style.display = "none";
				x = document.getElementById("bodyChat");
				x.style.display = "block";
			}
			console.log(this.userName);
		},
		writeNewPost: function () {
			console.log(this.myText);

			// https://firebase.google.com/docs/database/web/read-and-write

			// Values
			var text = this.myText;


			//mensaje//
			var userName = this.userName;
			// funcion de firebase//

			// A post entry

			var post = {
				name: userName,
				text: text
			};

			// Get a key for a new Post.
			/*con esta funcion cojo la clave de cada mensaje*/
			var newPostKey = firebase.database().ref().child('chatOlalla').push().key;

			//Write data
			/*creo una variable d eobjetos y despues la igualo a post para que coja los datos introducidos en name y text*/
			var updates = {};
			updates[newPostKey] = post;

			/*con esta función retorno los datos actualizados poniendo como parametro la variable update creada anteriormente para este fin*/
			return firebase.database().ref('chatOlalla').update(updates);
		},
		getPosts: function () {

			/*llamada a la funcion para que al hacer click introduzca los datos*/
			this.writeNewPost();

			/*esta funcion la uso para coger los datos del usuario,poder enviar los mensajes introducidos `para despues mostrarlos por la pantalla*/
			firebase.database().ref('chatOlalla').on('value', function (data) {

				var posts = document.getElementById("divMensajes");

				/*vacia posto para que no se repitan los mensajes*/
				posts.innerHTML = "";

				/*variable que me da acceso a los datos de la base de datos en firebase*/
				var messages = data.val();

				/*sentencia for coge la key y sus datos de cada mensaje para despues crear dos elementos que alojaran esos datos y seran insertados en el div creado para introducir los emnsajes*/
				for (var key in messages) {
					var globo = document.createElement("div");
					var nameUser = document.createElement("p");
					var text = document.createElement("p");


					text.setAttribute("class", "pMensaje");
					nameUser.setAttribute("class", "pMensajeName");
					var element = messages[key];
					if (firebase.auth().currentUser.displayName == element.name) {
						globo.setAttribute("class", "globos");
					} else {
						globo.setAttribute("class", "globos2");
					}
					text.append(element.text);
					nameUser.append(element.name);

					globo.append(nameUser);
					globo.append(text)
					posts.append(globo);

					/*la siguente funcion hace que cada vez que introduzca un mensajeel scroll del div en el que son introducidos se desplace hacia el ultimo mensaje escrito*/
					document.getElementById("divMensajes").scrollTop = document.getElementById("divMensajes").scrollHeight;
				}
			})
			/*sentencia para borrar el cintenedor donde se escriben los mensajes al ser enviados*/
			var borrarCaja = document.getElementById("cajaMensaje");
			borrarCaja.value = "";

			/*con esto actualizamos la variable para que se vacie con cada mensaje*/
			this.myText = "";
			console.log(borrarCaja.value);

		},
		logOut: function () {
			firebase.auth().signOut().then(function () {
				// Sign-out successful.
				console.log("out")
			}).catch(function (error) {
				// An error happened.
				console.log("error")
			});
			y = document.getElementById("bodyChat");
			y.style.display = "none";
			x = document.getElementById("botonEntrar");
			x.style.display = "block";
			console.log(this.userName);
		},
	}
});
