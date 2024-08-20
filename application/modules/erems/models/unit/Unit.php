<?php

/**
 * Description of Unit
 *
 * @author tommytoban
 */
class Erems_Models_Unit_Unit extends Erems_Box_Models_ObjectEmbedData{
    private $number;
    private $progress;
    private $serahTerimaPlan;
    private $lebarJalan;
    private $gambarRumah;
    private $isReadyStock;
    private $isReadySell;
	private $isReadyLegal;
    private $virtualaccountBca;
    private $customerNo;
    private $customerInt;
    private $koordinat;
    private $virtualaccountMandiri;
    private $listNomorSpk;
     //added by iqbal 07 mei 2019
    private $landSize;
    private $buildingSize;
    // end
	private $isFasum;
    private $gambar;
    // added by rico 14062021
    private $notes_siapstock;

    //addded by anas 08072021
    private $nilai_survey;
    private $nilai_survey_nps;
	
    private $isHoldTeknik;
    private $notesHoldTeknik;

	private $isBlokir;
    private $floor;

    private $orientasi_akses_unit_id;

    private $isRumahContoh; // added by rico 17022023

    private $state_admistrative; // added by rico 08032023
    private $is_orderbangun;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct();
        $this->embedPrefix = "unit_";
         $this->embedPrefix = $embedPrefix==NULL?'unit_':$embedPrefix;
    }
    
    public function getNumber() {
        return $this->number;
    }

    public function setNumber($number) {
        $this->number = $number;
    }
    
    public function getProgress() {
        return $this->progress;
    }

    public function setProgress($progress) {
        $this->progress = $progress;
    }
    
    public function getSerahTerimaPlan() {
        return $this->serahTerimaPlan;
    }

    public function setSerahTerimaPlan($serahTerimaPlan) {
        $this->serahTerimaPlan = $this->ignoredd($serahTerimaPlan);
    }
    
    function getLebarJalan() {
        return floatval($this->lebarJalan);
    }

    function getGambarRumah() {
        return $this->gambarRumah;
    }

    function setLebarJalan($lebarJalan) {
        $this->lebarJalan = floatval($lebarJalan);
    }

    function setGambarRumah($gambarRumah) {
        $this->gambarRumah = $gambarRumah;
    }
    
    function getIsReadyStock() {
        return $this->isReadyStock;
    }

    function getIsReadySell() {
        return $this->isReadySell;
    }

    function setIsReadyStock($isReadyStock) {
        $this->isReadyStock = $isReadyStock;
    }

    function setIsReadySell($isReadySell) {
        $this->isReadySell = $isReadySell;
    }

	function setIsReadyLegal($isReadyLegal) {
        $this->isReadyLegal = $isReadyLegal;
    }

	function getIsReadyLegal() {
        return $this->isReadyLegal;
    }
    
    
    function getVirtualaccountMandiri() {
        return $this->virtualaccountMandiri;
    }

    function setVirtualaccountMandiri($virtualaccountMandiri) {
        $this->virtualaccountMandiri = $virtualaccountMandiri;
    }
    
    function getListNomorSpk() {
        return $this->listNomorSpk;
    }

    function setListNomorSpk($listNomorSpk) {
        $this->listNomorSpk = $listNomorSpk;
    }

    //added by iqbal 07 mei 2019

    function getLandSize(){
        return $this->landSize;
    }

    function setLandSize($landSize){
        $this->landSize = $landSize;
    }

    function getBuildingSize(){
        return $this->buildingSize;
    }

    function setBuildingSize($buildingSize){
        $this->buildingSize = $buildingSize;
    }
     //end 
    public function getIsFasum() {
        return $this->isFasum;
    }

    public function setIsFasum($isFasum) {
        $this->isFasum = $isFasum;
    }
    
    function getGambar() {
        return $this->gambar;
    }
    
    function setGambar($gambar) {
        $this->gambar = $gambar;
    }

    public function getNotes_siapstock() {
        return $this->notes_siapstock;
    }

    public function setNotes_siapstock($notes_siapstock) {
        $this->notes_siapstock = $notes_siapstock;
    }    

    //added by anas 08072021
    public function getNilaisurvey() {
        return $this->nilai_survey;
    }

    public function setNilaisurvey($nilai_survey) {
        $this->nilai_survey = $nilai_survey;
    }

    public function getNilaisurveyNPS() {
        return $this->nilai_survey_nps;
    }

    public function setNilaisurveyNPS($nilai_survey_nps) {
        $this->nilai_survey_nps = $nilai_survey_nps;
    }
    //end added by anas
	public function getIsHoldTeknik() {
		return $this->isHoldTeknik;
	}

	public function getNotesHoldTeknik() {
		return $this->notesHoldTeknik;
	}

	public function setIsHoldTeknik($isHoldTeknik) {
		$this->isHoldTeknik = $isHoldTeknik;
	}

	public function setNotesHoldTeknik($notesHoldTeknik) {
		$this->notesHoldTeknik = $notesHoldTeknik;
	}
    //end added by anas
    public function getIsBlokir() {
        return $this->isBlokir;
    }

    public function setIsBlokir($isBlokir) {
        $this->isBlokir = $isBlokir;
    }

    function getFloor(){
        return $this->floor;
    }

    function setFloor($floor){
        $this->floor = $floor;
    }

    function getOrientasi(){
        return $this->orientasi_akses_unit_id;
    }

    function setOrientasi($orientasi_akses_unit_id){
        $this->orientasi_akses_unit_id = $orientasi_akses_unit_id;
    }
            
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['unit_id'])){
           $this->setId($x['unit_id']); 
        }
        if(isset ($x['unit_number'])){
           $this->setNumber($x['unit_number']); 
        }
        if(isset ($x['progress'])){
           $this->setProgress($x['progress']);
        }
        if(isset ($x['serahterima_plan'])){
           $this->setSerahTerimaPlan($x['serahterima_plan']);
        }
        if(isset ($x['lebar_jalan'])){
           $this->setLebarJalan($x['lebar_jalan']);
        }
        if(isset ($x['gambar_rumah'])){
           $this->setGambarRumah($x['gambar_rumah']);
        }
        if(isset ($x['is_readystock'])){
           $this->setIsReadyStock($x['is_readystock']);
        }
        if(isset ($x['is_readysell'])){
           $this->setIsReadySell($x['is_readysell']);
        }

	    if(isset ($x['is_readylegal'])){
           $this->setIsReadyLegal($x['is_readylegal']);
        }
        if(isset ($x['customer_no'])){
           $this->setCustomerNo($x['customer_no']);
        }
        if(isset ($x['customer_int'])){
           $this->setCustomerInt($x['customer_int']);
        }
        if(isset ($x['koordinat'])){
           $this->setKoordinat($x['koordinat']);
        }
        if(isset ($x['virtualaccount_bca'])){
           $this->setVirtualaccountBca($x['virtualaccount_bca']);
        }
        if(isset ($x['virtualaccount_mandiri'])){
           $this->setVirtualaccountMandiri($x['virtualaccount_mandiri']);
        }
         if(isset ($x['list_nomor_spk'])){
           $this->setListNomorSpk($x['list_nomor_spk']);
        }

         //added by iqbal 07 mei 2019

        if(isset ($x['land_size'])){
            $this->setLandSize($x['land_size']);
        }

        if(isset ($x['building_size'])){
            $this->setBuildingSize($x['building_size']);
        }

        //end
		
		if(isset ($x['is_fasum'])){
            $this->setIsFasum($x['is_fasum']);
        }
        
        if(isset ($x['gambar'])){
           $this->setGambar($x['gambar']);
        }
        
        if(isset ($x['notes_siapstock'])){
           $this->setNotes_siapstock($x['notes_siapstock']);
        }
      
        //added by anas 08072021
        if(isset ($x['nilai_survey'])){
           $this->setNilaisurvey($x['nilai_survey']);
        }
        if(isset ($x['nilai_survey_nps'])){
           $this->setNilaisurveyNPS($x['nilai_survey_nps']);
        }
		if(isset ($x['is_holdteknik'])){
           $this->setIsHoldTeknik($x['is_holdteknik']); 
        }
        if(isset ($x['notes_holdteknik'])){
           $this->setNotesHoldTeknik($x['notes_holdteknik']); 
        }

		if(isset ($x['is_blokir'])){
           $this->setIsBlokir($x['is_blokir']); 
        }

        if(isset ($x['floor'])){
           $this->setFloor($x['floor']); 
        }

        if(isset ($x['orientasi_akses_unit_id'])){
           $this->setOrientasi($x['orientasi_akses_unit_id']); 
        }
        
         // added by rico 17022023
        if(isset ($x['is_rumahcontoh'])){
            $this->setIsRumahContoh($x['is_rumahcontoh']);
        }
        
         // added by rico 08032023
        if(isset ($x['state_admistrative'])){
            $this->setState_admistrative($x['state_admistrative']);
        }
        if(isset ($x['is_orderbangun'])){
            $this->setIs_orderbangun($x['is_orderbangun']);
        }

        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'unit_id'=>$this->getId(),
            'unit_number'=>$this->getNumber(),
            'progress'=>$this->getProgress(),
            'serahterima_plan'=>$this->getSerahTerimaPlan(),
            'lebar_jalan'=>$this->getLebarJalan(),
            'gambar_rumah'=>$this->getGambarRumah(),
            'is_readystock'=>$this->getIsReadyStock(),
            'is_readysell'=>$this->getIsReadySell(),
			'is_readylegal'=>$this->getIsReadyLegal(),
            'koordinat'=>$this->getKoordinat(),
            'customer_no'=>$this->getCustomerNo(),
            'customer_int'=>$this->getCustomerInt(),
            'virtualaccount_bca'=>$this->getVirtualaccountBca(),
            'virtualaccount_mandiri'=>$this->getVirtualaccountMandiri(),
            'list_nomor_spk'=>$this->getListNomorSpk(),
             //added by iqbal 07 mei 2019
            'land_size'=>$this->getLandSize(),
            'building_size'=>$this->getBuildingSize(),
            //end
			'is_fasum'=>$this->getIsFasum(),
            'gambar'=>$this->getGambar(),
            'notes_siapstock'=>$this->getNotes_siapstock()

            //added by anas 08072021
            , 'nilai_survey'=>$this->getNilaisurvey()
            , 'nilai_survey_nps'=>$this->getNilaisurveyNPS(),
				
			'is_holdteknik'=>$this->getIsHoldTeknik(),
            'notes_holdteknik'=>$this->getNotesHoldTeknik(),
            'is_blokir'=>$this->getIsBlokir(),
            'floor'=>$this->getFLoor(),
            'orientasi_akses_unit_id'=>$this->getOrientasi(),

            'is_rumahcontoh'=>$this->getIsRumahContoh(), // added by rico 17022023

            'state_admistrative'=>$this->getState_admistrative(), // added by rico 08032023
            'is_orderbangun'=>$this->getIs_orderbangun()
        );
        
        return $x;
    }

    /**
     * @return mixed
     */
    public function getVirtualaccountBca()
    {
        return $this->virtualaccountBca;
    }

    /**
     * @param mixed $virtualaccountBca
     *
     * @return self
     */
    public function setVirtualaccountBca($virtualaccountBca)
    {
        $this->virtualaccountBca = $virtualaccountBca;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCustomerNo()
    {
        return $this->customerNo;
    }

    /**
     * @param mixed $customerNo
     *
     * @return self
     */
    public function setCustomerNo($customerNo)
    {
        $this->customerNo = $customerNo;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCustomerInt()
    {
        return $this->customerInt;
    }

    /**
     * @param mixed $customerInt
     *
     * @return self
     */
    public function setCustomerInt($customerInt)
    {
        $this->customerInt = $customerInt;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getKoordinat()
    {
        return $this->koordinat;
    }

    /**
     * @param mixed $koordinat
     *
     * @return self
     */
    public function setKoordinat($koordinat)
    {
        $this->koordinat = $koordinat;

        return $this;
    }

    // added by rico 17022023
    public function getIsRumahContoh() {
        return $this->isRumahContoh;
    }

    public function setIsRumahContoh($isRumahContoh) {
        $this->isRumahContoh = $isRumahContoh;
    }

    // added by rico 08032023
    public function getState_admistrative() {
        return $this->state_admistrative;
    }

    public function setState_admistrative($state_admistrative) {
        $this->state_admistrative = $state_admistrative;
    }

    public function getIs_orderbangun() {
        return $this->is_orderbangun;
    }

    public function setIs_orderbangun($is_orderbangun) {
        $this->is_orderbangun = $is_orderbangun;
    }
}

?>
