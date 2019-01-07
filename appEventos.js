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
	},
	created: function () {
		this.getData();
		this.createArrays();
		this.insertNone();

	},
	methods: {
		getData: function () {
			fetch("https://api.myjson.com/bins/q8dyg", {
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
		}
	}
});
