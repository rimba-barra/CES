Ext.define('Erems.controller.Siteplan', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Siteplan',
	views: ['siteplan.Panel', 'siteplan.Konten', 'siteplan.FormSearch'],
	stores: ['Sourcemoney', 'Mastercluster'],
	models: ['Sourcemoney', 'Mastercluster'],
	refs: [
		{
			ref: 'konten',
			selector: 'siteplankonten'
		},

		{
			ref: 'panel',
			selector: 'siteplanpanel'
		},
		{
			ref: 'formsearchtb',
			selector: 'siteplanformsearch'
		},
	],

	controllerName: 'siteplan',
	fieldName: 'payment_id',
	formWidth: 800,
	tools: null,
	myConfig: null,

	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});
	},

	init: function (application) {

		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

		if (typeof SvgPanZoom === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'resources/svgpanzoom/dist/svg-pan-zoom.js', function () {

			}, function () {
				alert("error load svg pan zoom")
			});
		}
		if (typeof Mustache === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

				if (typeof ApliJs === "undefined") {
					Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () {

						console.log("[INFO] ApliJs loaded.");

					}, function () {
						// error load file
					});
				}


			}, function () {
				//  me.tools.alert.warning("Error load Prolibs.js file.");
			});

		}

		this.control({
			'siteplanpanel': {
				afterrender: this.panelAfterRendertb

			},
			'siteplankonten': {
				afterrender: this.kontenAfterRender,
			},
			'siteplanformsearch ': {
				afterrender: this.formSearchAfterRender
			},
			'siteplanformsearch button[action=search]': {
				click: this.dataSearch
			},
			'siteplanformsearch button[action=reset]': {
				click: this.dataResettb
			},
		});
	},
	panelAfterRendertb: function () {
		var me = this;

		var p = me.getPanel();
		p.up("window").maximize();
	},

	dataResettb: function () {
		var me = this;

		me.getFormsearchtb().getForm().reset();
		me.dataSearch();
	},

	formSearchAfterRender: function (el) {
		var me = this;
		clustercbx = me.getFormsearchtb().down('[name=cluster_id]').getStore();
		clustercbx.load({params: {start: 0, limit: 0, flag_svg: 1}})
//		me.loadComboBoxStore(el);
	},

	kontenAfterRender: function (el) {
		var me = this;
		var params = {};
		var f = me.getFormsearchtb();
		var t = f.down("[name=cluster_id]");
		$('.x-tool-close').click(function (event) {
		});

	},
	dataSearch: function () {
		var me = this;
		var params = {};
		var f = me.getFormsearchtb();
		var t = f.down("[name=cluster_id]").getValue();
		var rec = f.down("[name=cluster_id]").getStore().getAt(f.down("[name=cluster_id]").getStore().findExact('cluster_id', t));
		params = {cluster_id: t, siteplan_svg: rec.get('siteplan_svg')};

		$.ajax({
			method: "POST",
			url: "erems/siteplan/loadsvg",
			data: params
		}).done(function (msg) {
			ApliJs.showPhp(me, 'siteplan_svg', msg, 'false', '.content_data', '', 'replace');
		});

	},

	apliJsFuncsiteplan_svg: function (modalId) {
		var me = this;
		var x = {
			init: function () {

			},
			afterRender: function () {
//				alert("ASAS");
				// ApliJs.reset();

				$(function () {

//					$('.x-region-collapsed-placeholder').css("z-index", 1);
//
//					ApliJs.form('#' + modalId + ' form').initEvent();
//
//
//					var action = $('#' + modalId).attr("abc-action");
//
//					if (action === "index") {
//
//
//					} else {
//					}

//					console.log(me.getKonten().down("[name=arrUnit]").getValue());
					/*MANIPULATE SVG LEGEND*/
//					Ext.Array.each(me.getKonten().query("[name=arrUnit]"), function (field) {
//						console.log(field);
//					});
//					var legend = document.getElementById("svglegend-" + record.get('siteplanlegend_id'));
//
//					// It's important to add an load event listener to the object,
//					// as it will load the svg doc asynchronously
//					legend.addEventListener("load", function () {
//
//						// get the inner DOM of alpha.svg
//						var svgDoc = legend.contentDocument;
//						console.log(svgDoc);
//
//						// get the inner element by id
//						var delta = svgDoc.getElementById(record.get('legendid_svg'));
//						delta.setAttribute("style",
//								"fill:" + record.get('color')
//								+ ";stroke-width: 1;stroke:black"
//								);
//						// add behaviour
////						delta.addEventListener("mousedown", function () {
////							alert('hello world!')
////						}, false);
//					}, false);

					/*MANIPULATE SVG MAIN*/
//					var a = document.getElementById("svglegend");


					// It's important to add an load event listener to the object,
					// as it will load the svg doc asynchronously
//					a.addEventListener("load", function () {
//						// Expose to window namespase for testing purposes
//						window.zoomTiger = svgPanZoom('#svglegend', {
////							window.zoomTiger = svgPanZoom('#'+idSVG, {
//							zoomEnabled: true,
//							controlIconsEnabled: true,
//							fit: true,
//							center: true,
//							// viewportSelector: document.getElementById('demo-tiger').querySelector('#g4') // this option will make library to misbehave. Viewport should have no transform attribute
//						});
//
//						// get the inner DOM of alpha.svg
//						var svgDoc = a.contentDocument;

						// get the inner element by id
//						var delta = svgDoc.getElementById("C07-01-F");
//						delta.setAttribute("style",
//								"fill:black"
//								+ ";stroke-width: 1;stroke:black"
//								);
//						delta.setAttributeNS(null, "style",
//								"fill:" + record.get('color')
////							+";stroke-width: 1;stroke:black"
//								);
//						console.log(delta);
						// add behaviour
//						delta.addEventListener("mousedown", function () {
//							alert('hello world!')
//						}, false);
//					}, false);
				});
			}
		};
		return x;
	},
});