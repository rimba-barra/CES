<?php

/**
 * Description of Constructionb
 *
 * @author MIS
 */
class Erems_Models_Construction_Constructionb extends Erems_Box_Models_ObjectEmbedData {
    private $paymentPercentage;
    private $totalremainingDenda;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
       // $this->embedPrefix = "block_";
         $this->embedPrefix = $embedPrefix==NULL?'constructionb_':$embedPrefix;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['payment_percentage'])){
           $this->setPaymentPercentage($x['payment_percentage']); 
        }
        if(isset ($x['total_remaining_denda'])){
           $this->setTotalremainingDenda($x['total_remaining_denda']); 
        }   
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            "payment_percentage"=>$this->getPaymentPercentage(),
            "total_remaining_denda"=>$this->getTotalremainingDenda()
        );
        
        return $x;
    }
    

    /**
     * @return mixed
     */
    public function getPaymentPercentage()
    {
        return $this->paymentPercentage;
    }

    /**
     * @param mixed $paymentPercentage
     *
     * @return self
     */
    public function setPaymentPercentage($paymentPercentage)
    {
        $this->paymentPercentage = $paymentPercentage;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getTotalremainingDenda()
    {
        return $this->totalremainingDenda;
    }

    /**
     * @param mixed $totalremainingDenda
     *
     * @return self
     */
    public function setTotalremainingDenda($totalremainingDenda)
    {
        $this->totalremainingDenda = $totalremainingDenda;

        return $this;
    }
}

?>
