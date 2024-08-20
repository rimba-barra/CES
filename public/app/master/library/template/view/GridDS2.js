/*
 * @name GridDS2 [ Grid Dynamic Store Implement StoredElement]
 * @extend Master.library.template.view.GridDS
 * 
 */
Ext.define('Master.library.template.view.GridDS2', {
    extend: 'Master.library.template.view.GridDS',
    alias: 'widget.templateviewgridds2',
    requires:['Master.library.StoredElement'],
    storedElement:null,
    doInit:function(){
        var me = this;
        if(!me.storedElement){
            me.storedElement = new Master.library.StoredElement({
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
            me.storedElement = new Master.library.StoredElement({
                el:this
            });
        }
        me.storedElement.load();
    }
});