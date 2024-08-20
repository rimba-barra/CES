Ext.define('Appsmgmt.library.SearchTrigger', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.searchtrigger',
    triggerCls: 'x-form-clear-trigger',
    trigger2Cls: 'x-form-search-trigger',
    onTriggerClick: function() {
        this.setValue('')
        this.setFilter(this.up().dataIndex, '')
    },
    onTrigger2Click: function() {
        this.setFilter(this.up().dataIndex, this.getValue())
    },
    setFilter: function(filterId, value){
        var store = this.up('grid').getStore();
        if(value){
            store.clearFilter();
            var filter = {id: filterId, property: filterId, value: value};
            if(this.anyMatch) filter.anyMatch = this.anyMatch
            if(this.caseSensitive) filter.caseSensitive = this.caseSensitive
            if(this.exactMatch) filter.exactMatch = this.exactMatch
            if(this.operator) filter.operator = this.operator
            store.filter(filter);

        } else {
            store.clearFilter();
            store.reload();
        }
    },
    listeners: {
        render: function(){
            var me = this;
            me.ownerCt.on('resize', function(){
                me.setWidth(this.getEl().getWidth())
            })
        },
        change: function() {
            if(this.autoSearch) this.setFilter(this.filterId, this.getValue())
        }
    }
})