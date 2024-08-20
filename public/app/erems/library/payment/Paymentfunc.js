Ext.define('Erems.library.payment.Paymentfunc', {
    p_value:0,// payment value
    error:[],
    requires:['Erems.library.payment.Tagihan'],
    cdn_value:0, /// 0 -> none , 1 -> credit , 2 -> debit
    cdn_amount:0.0,
    tagihan:null, /// object tagihan
    tagihan_paid:null,
    //sch_data:null, /// added 8 Okt delete 8 okt
    set_cdn_value:function(v) {
        this.cdn_value = parseInt(v);
    },
    set_p_value:function(v){
        this.p_value = toFloat(v);
    },
    set_pl_id:function(id) {
        this.pl_id = parseInt(id);
    },
    set_pl_model:function(m) {
        this.pl_model = m;
    },
    setTagihan:function(schDat){
        this.tagihan = new Erems.library.payment.Tagihan();
        this.tagihan.init(null,schDat);
        this.tagihan_paid = new Erems.library.payment.Tagihan();
       // this.tagihan = d;
        //this.tagihan_paid = pd;
       
    },
    process:function() {
    
        if (!this.valid_input())
            return false;

        
        this.calculate();
    },
    /* make little different from php function ... */
    // return must be object...
    formula:function(pv, rb,nrb,sisa) {
        var hasil = {nrb:0.0,sisa:0.0}; /// added in js only
        nrb = rb;

        if (pv >= rb) {
            nrb = 0;
            sisa = pv - rb;
        } else {
            nrb = rb - pv;
            sisa = 0;
        }
        hasil.nrb = nrb;
        hasil.sisa = sisa;
        return hasil;
    },

    calculate:function() {
        var pv = this.p_value;

        var nrb = 0;
        var sisaPayment = 0.0;
        var currentRb = 0; /// current remaining balance
        var hasilFormula = 0;

        var currentCicilan = 0;


        var jumlahCicilan = this.tagihan.getJumlahCicilan();
        var tempCicilan = null;

        while (pv > 0 && this.tagihan.getListCicilan().hasOwnProperty(currentCicilan)) {

            currentRb = this.tagihan.getCicilan(currentCicilan).getRemainingBalance();
            hasilFormula = this.formula(pv, currentRb, nrb, sisaPayment);
            
            
            this.tagihan_paid.addCicilan();
    
            
            this.tagihan_paid.getCicilan(currentCicilan).setRemainingBalance(hasilFormula.nrb);
            this.tagihan_paid.getCicilan(currentCicilan).setScheduletype(this.tagihan.getCicilan(currentCicilan).getScheduletype());
            this.tagihan_paid.getCicilan(currentCicilan).setQueue(this.tagihan.getCicilan(currentCicilan).getQueue());
            pv = hasilFormula.sisa;

            currentCicilan++;
        }


        /// let's check credit debit note
        /* Credit debit note hanya berlaku jika cicilan yang tersisa tinggal satu [cicilan terakhir] */
        if (pv > 0) {
            if (this.cdn_value == 2) {
                this.cdn_amount = pv;
            }
        } else {
            
            if (this.cdn_value == 1 && (currentCicilan == jumlahCicilan)) {
                this.cdn_amount = this.tagihan_paid.getCicilan(currentCicilan - 1).getRemainingBalance();
                this.tagihan_paid.getCicilan(currentCicilan - 1).setRemainingBalance(0);
            }
        }
    },

    valid_input:function() {

//        if (get_class($this->pl_model) != 'Erems_Models_Purchaseletter')
//            $this->error[] = 'No model';
//        if ($this->pl_id == 0)
//            $this->error[] = 'No purchase letter id';
//        if ($this->p_value == 0)
//            $this->error[] = 'No Payment Value';
//        if (count($this->error) > 0) {
//            return false;
//        }
        return true;
    },

    print_error:function() {
        str = '';
//        if (this.error.length > 0) {
//            foreach (var row in this.error) {
//                str +=''+row+'</br>';
//            }
//        }
        return str;
    },
            
    getTagihanPaid:function(){
        return this.tagihan_paid;
    },
    getTagihan:function(){
        return this.tagihan;
    }
    
 
    
    
}
)


