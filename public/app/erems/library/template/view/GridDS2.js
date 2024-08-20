/*
 * @name GridDS2 [ Grid Dynamic Store Implement StoredElement]
 * @extend Erems.library.template.view.GridDS
 * 
 */
Ext.define('Erems.library.template.view.GridDS2', {
    extend: 'Erems.library.template.view.GridDS',
    alias: 'widget.templateviewgridds2',
    requires:['Erems.library.StoredElement'],
    storedElement:null,
    doInit:function(){
        var me = this;
        if(!me.storedElement){
            me.storedElement = new Erems.library.StoredElement({
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
            me.storedElement = new Erems.library.StoredElement({
                el:this
            });
        }
        me.storedElement.load();
    }
});