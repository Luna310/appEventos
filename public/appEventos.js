var app = new Vue({
	el: '#app',

	data: {
		eventos: [],
		eventosD: [],
		eventosF: [],
		eventosC: [],
		eventosP: [],
		eventFilter: [],
		oculto: "none",
		auxMap: "",
		varVolver: "",
		pHome: "",
		userName: "",
		email: "",
		myText: "",
		icon: false,
	},
	created: function () {
		this.getData();
		this.createArrays();
		this.insertNone();

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
			fetch("https://api.myjson.com/bins/1chpy8", {
				method: "GET",

			}).then(function (response) {
				if (response.ok) {


					return response.json();
				}

			}).then(function (json) {
				app.eventos = json.eventos;
				app.eventos = app.eventos.sort(function (a, b) {
					return (b.fecha - a.fecha)
				})
				app.createArrays();
				app.insertNone();
				app.auxMap;
				app.userName;
				app.email;
				app.icon;
				console.log(app.eventos);

			}).catch(function (error) {
				console.log("Request failed:" + error.message);
			});
		},

		/*funcion para crear arrays con los datos y poder acceder a ellos desde el HTML.Están filtrados segun su ID para porner los del mismo tipo juntos*/
		createArrays: function () {

			for (var i = 0; i < this.eventos.length; i++) {

				if (app.eventos[i].id == "deporte") {
					this.eventosD.push(app.eventos[i]);
				}
				if (app.eventos[i].id == "cultura") {
					this.eventosC.push(app.eventos[i]);
				}
				if (app.eventos[i].id == "festivo") {
					this.eventosF.push(app.eventos[i]);
				}

				if (app.eventos[i].id == "privado") {
					this.eventosP.push(app.eventos[i]);
				}

			}
			console.log(this.eventosD);
			console.log(this.eventosC);
			console.log(this.eventosF);
		},
		/*Función para ocultar de inicio los div que no quiero que se muestren*/
		insertNone: function () {
			var numSelect = 0;

			x = document.getElementById("calendario");
			x.style.display = this.oculto;

			y = document.getElementById("cultura");
			y.style.display = this.oculto;

			z = document.getElementById("deportes");
			z.style.display = this.oculto;

			l = document.getElementById("festivo");
			l.style.display = this.oculto;

			j = document.getElementById("privado");
			j.style.display = this.oculto;

			n = document.getElementById("eventoExtend");
			n.style.display = this.oculto;

			p = document.getElementById("chat");
			p.style.display = this.oculto;

			q = document.getElementById("bodyChat");
			q.style.display = this.oculto;
		},
		/*función para cambiar de div sugun hagamos click en el boton que elijamos.LO que hace es cambiar el valor del atributo display,uso un parametro para hacerlo mas dinamico y que la funcion me valga para todos los div,en el HTML meteré de parametro el id del div que quiero mostrar*/
		changeDiv: function (p) {

			x = document.getElementById("mainDiv");
			x.style.display = this.oculto;

			y = document.getElementById(p);
			y.style.display = "block";
			this.pHome = p;
			console.log(p)
		},
		changeDiv2: function () {

			x = document.getElementById("mainDiv");
			x.style.display = "block";

			y = document.getElementById(this.pHome);
			y.style.display = this.oculto;
		},
		/*funcion que mostrará el div con la información completa de cada evento,para ello se rellenará un nuevo array con este evento,para ello la función tiene dos parametros que uno de ellos será el nombre del evento que lo cogerá desde el HTML y de forma dinámica ya que el valor del nombre del evento varía automaticamente.el otro parametro se pondrá dependiendo del div desde el que llamemos al vento ya que ese parametro sera el div que ocultemos para mostrar el nuevo.Por último esta función engresará el mapa por medio de INNERHTML en el div que hemos creado para ello en el HTML,el valor de la variable auxMap sera o que se introduzca de forma dinamica.*/
		divExtend: function (p, p2) {

			for (var i = 0; i < this.eventos.length; i++) {

				if (app.eventos[i].nombre == p) {
					this.eventFilter.push(this.eventos[i])
					x = document.getElementById(p2);
					x.style.display = this.oculto;

					y = document.getElementById("eventoExtend");
					y.style.display = "block";

					this.auxMap = this.eventos[i].map
					this.varVolver = p2;

				}
			}
			console.log(this.auxMap);
			var q = document.getElementById("map");
			q.innerHTML = app.auxMap;
		},
		volver: function () {
			this.eventFilter = [];
			y = document.getElementById("eventoExtend");
			y.style.display = "none";
			x = document.getElementById(this.varVolver);
			x.style.display = "block";
			var q = document.getElementById("map");
			q.innerHTML = "";

		},
		toHome: function () {
			this.eventFilter = [];
			x = document.getElementById("eventoExtend");
			x.style.display = this.oculto;

			y = document.getElementById("mainDiv");
			y.style.display = "block";
			var q = document.getElementById("map");
			q.innerHTML = "";

			console.log(this.pHome)
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
					}else{
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
