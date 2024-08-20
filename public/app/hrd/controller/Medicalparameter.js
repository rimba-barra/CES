Ext.define('Hrd.controller.Medicalparameter', {
    extend: 'Hrd.library.box.controller.template.Parameters',
    alias: 'controller.Medicalparameter',
    views: [],
    controllerName: 'medicalparameter',
    formWidth: 600,
    refs: [
        {
            ref:'panel',
            selector:'medicalparameterpanel'
        }
    ],
    bindPrefixName: 'Medicalparameter',
    pafCallback: function(recs,form) {
        if (recs) {
            for (var i in recs) {
                var name = recs[i]['generalparameter']['name'];
                var el = form.down("[name=" + name + "]");
                if (el) {
                    el.setValue(recs[i]['generalparameter']['value']);
                }
            }
        }
        
        form.down("[name=claim_password]").setValue("");
    }

});