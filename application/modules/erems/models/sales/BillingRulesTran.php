<?php

/**
 * Description of BillingRulesTran
 *
 * @author MIS
 */
class Erems_Models_Sales_BillingRulesTran extends Erems_Models_Sales_BillingRules {

    private $priceType;
    private $tandaJadi;
    private $uangMuka;
    private $angsuran;
    private $isBalloon;
    private $isJeda;
    private $periodeJeda;
    private $typePeriodeJeda;

    public function __construct() {
        parent::__construct();
        $this->tandaJadi = new Erems_Models_Sales_Billing_TandaJadi();
        $this->uangMuka = new Erems_Models_Sales_Billing_UangMuka();
        $this->angsuran = new Erems_Models_Sales_Billing_Angsuran();
      
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
            $this->tandaJadi = new Erems_Models_Sales_Billing_TandaJadi();
        }
        return $this->tandaJadi;
    }

    public function getUangMuka() {
        if(!$this->uangMuka){
            $this->uangMuka = new Erems_Models_Sales_Billing_UangMuka();
        }  
        return $this->uangMuka;
    }

    public function getAngsuran() {
        if(!$this->angsuran){
            $this->angsuran = new Erems_Models_Sales_Billing_Angsuran();
        }
        return $this->angsuran;
    }

    
    public function getPriceType() {
        return $this->priceType;
    }

    public function setPriceType($priceType) {
        $this->priceType = $priceType;
    }
    
    function getIsBalloon() {
        return $this->isBalloon;
    }

    function setIsBalloon($isBalloon) {
        $this->isBalloon = $isBalloon;
    }
    
    function getIsJeda() {
        return $this->isJeda;
    }

    function setIsJeda($isJeda) {
        $this->isJeda = $isJeda;
    }
    
    function getPeriodeJeda() {
        return $this->periodeJeda;
    }

    function setPeriodeJeda($periodeJeda) {
        $this->periodeJeda = $periodeJeda;
    }
    
    function getTypePeriodeJeda() {
        return $this->typePeriodeJeda;
    }

    function setTypePeriodeJeda($typePeriodeJeda) {
        $this->typePeriodeJeda = $typePeriodeJeda;
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
        if (isset($x['pricetype_id'])) {
            $this->setPriceType($x['pricetype_id']);
        }
        if (isset($x['is_balloon'])) {
            $this->setIsBalloon($x['is_balloon']);
        }
        if (isset($x['is_jeda'])) {
            $this->setIsJeda($x['is_jeda']);
        }
        if (isset($x['periode_jeda'])) {
            $this->setPeriodeJeda($x['periode_jeda']);
        }
        if (isset($x['type_periode_jeda'])) {
            $this->setTypePeriodeJeda($x['type_periode_jeda']);
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
            'angsuran'=>$this->getAngsuran()->getAmount(),
            'pricetype_id'=>$this->getPriceType(),
            'is_balloon'=>$this->getIsBalloon(),
            'is_jeda'=>$this->getIsJeda(),
            'periode_jeda'=>$this->getPeriodeJeda(),
            'type_periode_jeda'=>$this->getTypePeriodeJeda(),
        );
        $x = array_merge($x, $y);

        return $x;
    }

}

?>
