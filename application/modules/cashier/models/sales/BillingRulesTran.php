<?php

/**
 * Description of BillingRulesTran
 *
 * @author MIS
 */
class Cashier_Models_Sales_BillingRulesTran extends Cashier_Models_Sales_BillingRules {

    private $priceType;
    private $tandaJadi;
    private $uangMuka;
    private $angsuran;

    public function __construct() {
        parent::__construct();
        $this->tandaJadi = new Cashier_Models_Sales_Billing_TandaJadi();
        $this->uangMuka = new Cashier_Models_Sales_Billing_UangMuka();
        $this->angsuran = new Cashier_Models_Sales_Billing_Angsuran();
      
    }
    
    public function setTandaJadi($tandaJadi) {
        $this->tandaJadi = $tandaJadi;
    }

    public function setUangMuka($uangMuka) {
        $this->uangMuka = $uangMuka;
    }

    public function setAngsuran($angsuran) {
        $this->angsuran = $angsuran;
    }

    
    public function getTandaJadi() {
        if(!$this->tandaJadi){
            $this->tandaJadi = new Cashier_Models_Sales_Billing_TandaJadi();
        }
        return $this->tandaJadi;
    }

    public function getUangMuka() {
        if(!$this->uangMuka){
            $this->uangMuka = new Cashier_Models_Sales_Billing_UangMuka();
        }  
        return $this->uangMuka;
    }

    public function getAngsuran() {
        if(!$this->angsuran){
            $this->angsuran = new Cashier_Models_Sales_Billing_Angsuran();
        }
        return $this->angsuran;
    }

    
    public function getPriceType() {
        return $this->priceType;
    }

    public function setPriceType($priceType) {
        $this->priceType = $priceType;
    }

    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);

        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['persen_tandajadi'])) {
            $this->getTandaJadi()->setPercent($x['persen_tandajadi']);
        }
        if (isset($x['tandajadi'])) {
            $this->getTandaJadi()->setAmount($x['tandajadi']);
        }
        if (isset($x['persen_uangmuka'])) {
            $this->getUangMuka()->setPercent($x['persen_uangmuka']);
        }
        if (isset($x['uangmuka'])) {
            $this->getUangMuka()->setAmount($x['uangmuka']);
        }
        if (isset($x['periode_uangmuka'])) {
            $this->getUangMuka()->setTypePeriodeAmount($x['periode_uangmuka']);
        }
        if (isset($x['type_periode_uangmuka'])) {
            $this->getUangMuka()->setTypePeriode($x['type_periode_uangmuka']);
        }
        if (isset($x['term_tandajadi'])) {
            $this->getTandaJadi()->setQuantity($x['term_tandajadi']);
        }
        if (isset($x['term_uangmuka'])) {
            $this->getUangMuka()->setQuantity($x['term_uangmuka']);
        }
        if (isset($x['periode_angsuran'])) {
            $this->getAngsuran()->setTypePeriodeAmount($x['periode_angsuran']);
        }
        if (isset($x['type_periode_angsuran'])) {
            $this->getAngsuran()->setTypePeriode($x['type_periode_angsuran']);
        }
        if (isset($x['term_angsuran'])) {
            $this->getAngsuran()->setQuantity($x['term_angsuran']);
        }
        if (isset($x['angsuran'])) {
            $this->getAngsuran()->setAmount($x['angsuran']);
        }

        unset($x);
    }

    public function getArrayTable() {
        $y = parent::getArrayTable();
        $x = array(
            'persen_tandajadi'=>$this->getTandaJadi()->getPercent(),
            'tandajadi'=>$this->getTandaJadi()->getAmount(),
            'term_tandajadi'=>$this->getTandaJadi()->getQuantity(),
            'persen_uangmuka'=>$this->getUangMuka()->getPercent(),
            'uangmuka'=>$this->getUangMuka()->getAmount(),
            'periode_uangmuka'=>$this->getUangMuka()->getTypePeriodeAmount(),
            'type_periode_uangmuka'=>$this->getUangMuka()->getTypePeriode(),
            'term_uangmuka'=>$this->getUangMuka()->getQuantity(),
            'periode_angsuran'=>$this->getAngsuran()->getTypePeriodeAmount(),
            'type_periode_angsuran'=>$this->getAngsuran()->getTypePeriode(),
            'term_angsuran'=>$this->getAngsuran()->getQuantity(),
            'angsuran'=>$this->getAngsuran()->getAmount()
        );
        $x = array_merge($x, $y);

        return $x;
    }

}

?>
