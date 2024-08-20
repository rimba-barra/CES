/*Abstract Data Object Element*/
Ext.define("Erems.library.Dae",{
    idProperty:null,
    id:0,
    _form:null,
    _field:null,
    _store:null,
    _rec:null,
    _prefix:null,
    _bindDae:{},
    constructor	: function(options){
        if(this.idProperty==null){
            console.log("[Dae Error]No IdProperty");
            return;
        }
        Ext.apply(this,options || {});
        var id = 0;
        if(this._form != null){
            var f = this._form;
            this._field = f.down("[name='"+this.idProperty+"']");
            /* check element lain yang mengandung prefix class ini*/
            if(this._prefix != null && this._field == null){
                this._field = f.down("[name='"+this._prefix+''+this.idProperty+"']");
            }
        }
        if(this._field != null){
            if(this.id == 0){
                this.id = this._field.getValue();
                if(this.id == null){
                    this.id = 0;
                }
            }
            
            if(this._field.isXType('combobox')){
                this._store = this._field.getStore();
            }
        }
        if(this._store != null){
            id = this.id;
            if(id !== 0){
                this._rec = this._getRec();
            }
        }
        if(this._rec != null){
            id = this.id;
            Ext.apply(this,this._rec.data || {});
            this.id = id;
        }
    },
    _refreshStore:function(autoLoad,storeParams){
        var al = typeof autoLoad==="undefined"?false:true;
        var sp = typeof storeParams==="object"?storeParams:null;
        this._store = this._field.getStore();
        if(al){
            this._store.load(sp);
        }
    },
    _refreshField:function(){
        if(this._field !=null){
            this.id = this._field.getValue();
            if(this.id != null && this.id !=""){
                this._rec = this._getRec();
            }
            
        }
    },
    _resetForm:function(){
        this._form.getForm().reset();
    },
    _getRec:function(){
        var r = this._store.findRecord(this.idProperty,this.id);
        if(r != null){
            var id = this.id;
            Ext.apply(this,r.data || {});
            this.id = id;
        }
        
    },
    _setId:function(id){
        this.id = id;
        this.rec = this._getRec();
    },
    /*@params object {
     * dae: Erems.library.Dae,
     * item:'binding_field'
     *}*/
    _bind:function(){
        var arDae = this._bindDae;
        for(var x in arDae){
            arDae[x].dae._setId(this[arDae[x].item]);
        }
        
    },
    _bindTo:function(daeName,dae){
        var item = this._bindDae[daeName];
        this._bindDae[daeName] = {
           dae:dae,
           item:item
        };
    }
});