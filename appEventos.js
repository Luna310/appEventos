var app = new Vue({
	el: '#app',

	data: {
		eventos: [],
		eventosD: [],
		eventosF: [],
		eventosC: [],
		eventFilter: [],
		oculto: "none",

	},
	created: function () {
		this.getData();
		this.createArrays();
		this.insertNone();

	},
	methods: {
		getData: function () {
			fetch("https://api.myjson.com/bins/t9z0o", {
				method: "GET",

			}).then(function (response) {
				if (response.ok) {


					return response.json();
				}

			}).then(function (json) {
				app.eventos = json.eventos;
				app.createArrays();
				app.insertNone();

				console.log(app.eventos.length);

			}).catch(function (error) {
				console.log("Request failed:" + error.message);
			});
		},
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

			}
			console.log(this.eventosD);
			console.log(this.eventosC);
			console.log(this.eventosF);
		},
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

			n = document.getElementById("eventoExtend");
			n.style.display = this.oculto;
		},
		changeDiv: function (p) {

			x = document.getElementById("mainDiv");
			x.style.display = this.oculto;

			y = document.getElementById(p);
			y.style.display = "block";

			console.log(p)
		},

		divExtend: function (p, p2) {
			
			for (var i = 0; i < this.eventos.length; i++) {
				if (app.eventos[i].nombre == p) {
					this.eventFilter.push(this.eventos[i])
					x = document.getElementById(p2);
					x.style.display = this.oculto;

					y = document.getElementById("eventoExtend");
					y.style.display = "block";

				}
			}
			console.log(this.eventFilter)

		}
	}
});
