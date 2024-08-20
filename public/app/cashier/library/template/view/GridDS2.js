/*
 * @name GridDS2 [ Grid Dynamic Store Implement StoredElement]
 * @extend Cashier.library.template.view.GridDS
 * 
 */
Ext.define('Cashier.library.template.view.GridDS2', {
    extend: 'Cashier.library.template.view.GridDS',
    alias: 'widget.templateviewgridds2',
    requires:['Cashier.library.StoredElement'],
    storedElement:null,
    doInit:function(){
        var me = this;
        if(!me.storedElement){
            me.storedElement = new Cashier.library.StoredElement({
                el:this
            });
        }
        me.storedElement.init();
    },
    attachModel:function(data){
        var me = this;
        me.storedElement.attachModel(data);
    },
    xLoad:function(){
        var me = this;
        if(!me.storedElement){
            me.storedElement = new Cashier.library.StoredElement({
                el:this
            });
        }
        me.storedElement.load();
    }
});