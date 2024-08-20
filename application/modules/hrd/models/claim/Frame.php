<?php

/**
 * Description of Frame
 *
 * @author MIS
 */
class Hrd_Models_Claim_Frame extends Hrd_Models_Claim_ClaimGlasses {
    public function __construct() {
        parent::__construct();
        $this->setType("F");
    }

}

?>
