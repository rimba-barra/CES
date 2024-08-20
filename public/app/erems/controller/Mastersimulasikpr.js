Ext.define('Erems.controller.Mastersimulasikpr', {
    extend: 'Erems.library.template.controller.Controller', 
    alias: 'controller.Mastersimulasikpr',
    views: ['mastersimulasikpr.Panel', 'mastersimulasikpr.FormData'],
	stores: [],
	models: [],
    refs: [
        {
            ref: 'panel',
            selector: 'mastersimulasikprpanel'
        },
        {
            ref: 'formdata',
            selector: 'mastersimulasikprformdata'
        }

    ],
    controllerName: 'mastersimulasikpr',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Mastersimulasikpr',
    init: function(application) {
        var me = this;
        this.control({
            'mastersimulasikprpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'mastersimulasikprformdata': {
                afterrender: this.formDataAfterRender
            },
			'mastersimulasikprformdata button[action=reset]': {
				click: this.dataReset
            },
			'mastersimulasikprformdata [name=kpr_realisation]': {
                keyup: me.fillKPRCicilan
            },
			'mastersimulasikprformdata [name=kpr_cicilan]': {
                keyup: me.fillKPRCicilan
            },
			'mastersimulasikprformdata [name=kpr_tenor]': {
                keyup: me.fillKPRCicilan
            },
			'mastersimulasikprformdata [name=kpr_interest]': {
                keyup: me.fillKPRCicilan
            },
        });
    },
	
	dataReset: function() {
        var me = this;
        me.getFormdata().getForm().reset();
    },
	
	fillKPRCicilan: function(){ 
		var me = this;
		var kpr_realisation = toFloat(me.getFormdata().down('[name=kpr_realisation]').getValue());
		var kpr_tenor = toFloat(me.getFormdata().down('[name=kpr_tenor]').getValue());
		var kpr_interest = toFloat(me.getFormdata().down('[name=kpr_interest]').getValue());
		
		var totalCicilan = me.PMT(kpr_interest/1200, kpr_tenor, -kpr_realisation);
		
		me.getFormdata().down('[name=kpr_cicilan]').setValue(me.fmb(totalCicilan));
	},
	PMT: function(i, n, p){
		return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n));
	},
	
	fmb: function(val) {
        return this.fm(val, 2, ',', '.');
    },
    fm: function(n, decPlaces, thouSeparator, decSeparator) {
        var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
                decSeparator = decSeparator == undefined ? "." : decSeparator,
                thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
                sign = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    }

});