Ext.define('Gl.library.box.tools.TextCombo', {
    getControl: function(data) {
        /*
         * 
         *{
         textfieldName:'absenttype_id',
         comboboxName:'absenttype_code',
         formRef:'absentrecordformdatareason'
         } 
         */
        var f = null, c = null, t = null;
        var newEvs = {};
        var me = this;
        if (!data.textfieldName || !data.comboboxName || !data.formRef) {
            console.log('[TextCombo Error] textfieldName or comboboxName or formRef is invalid');
            return newEvs;
        }
        f = data.formRef;
        c = data.comboboxName;
        t = data.textfieldName;
        newEvs[f+' [name='+t+']'] = {
            keyup: function(el) {
                me.textFieldOnKeyUp(el,data.displayField,c);
            }
        };
        newEvs[f+' [name='+c+']'] = {
            select: function(el) {
                me.comboboxOnSelect(el,data.displayField,t);
            }
        };

        return newEvs;
    },
    textFieldOnKeyUp:function(el,displayField,comboboxElement){
     
        var f = el.up("form");
        var e = f.down("[name="+comboboxElement+"]");
        var s = e.getStore();
        var indexRec = s.findExact(displayField,el.getValue());
        if(indexRec > -1){
            e.setValue(s.getAt(indexRec).get(s.getProxy().getReader().getIdProperty()));
        }
    },
    comboboxOnSelect:function(el,displayField,displayElement){
        var rec = el.getSelectedRec();
        var f = el.up("form");
        f.down("[name="+displayElement+"]").setValue(rec.get(displayField));
        
    }
});