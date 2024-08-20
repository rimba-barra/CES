<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitraLandPalu {
    
    public function getHTML_old() {
        return '
			<style>
				table {
			    border-collapse: collapse;
			}



			table, td, th {
			    border: 1px solid black;
				font-size:12px;
			}
			td{
				padding:2px 10px;
			}



			    p.spstyle_p{
			        font-size: 12px;
			    }
				p.spstyle_p_small{
			        font-size: 8px;
				
			    }
                            .left{
                                float:left;
                                width:50%;
                            }
                            .right{
                                float:right;
                                width:50%;
                                text-align:right;
                            }
			</style>
			
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
                        <div class="left">
                        <p class="spstyle_p">No. Ref : <b>{{nomor_sp_teratas}}</b><br/>
                                        Hal : <b>{{sp_surat_header}}</b></p>
                    </div>
                    <div class="right">
                        <p class="spstyle_p" align="right">Bogor, <b>{{tanggal_print}}</b></p>
                    </div>
			

			<p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
			    {{dataTagihan}}Bapak/Ibu <b>{{customer_name}}</b><br/>
			    {{customer_address}}</p>

			<p class="spstyle_p">Dengan Hormat,<br/>
			    Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling  <b>{{unit_number}}</b> di Citra Indah Jonggol. Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:
                        </p>   
			{{{list_tagihan}}}
			{{{pageBreak3}}}   
                        <p class="spstyle_p">
			Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat datang langsung ke Kantor Pemasaran Citra Indah atau dengan mentransfer ke rekening :<br/>
			{{pt_rekening_followup}}<br/>
			{{nama_pt}} Bank Mandiri Cab. Jakarta Berdharma, A/c No. {{acc_no_mandiri}}<br/>
                        Jl. Jendral Sudirman Kav.32-33, Jakarta 10220<br/>
                        atau ke rekening :<br/>
                        {{nama_pt}} BCA Cab. Daan Mogot, A/c No. {{acc_no_bca}} <br/>
                        Jl. Daan Mogot No. 48b, Jakarta Barat 11450<br/> 
                        </p>
			{{{pageBreak2}}}
                        <p class="spstyle_p">
			Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat difax ke no. 021-89932023 dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag.Collection).<br/>
			Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
			Hormat Kami,</br>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			Agus Sulistiyo (HOD Finance)<br/>
			--------------------------------------<br/>
			cc : Vivi Riberu (HOD Marketing)<br/>
			{{salesman_name}} (Sales)<br/>
			</p>

			<p class="spstyle_p_small"><u>*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</u></p>

        ';
    }
    
    public function getListTagihanHTML($params){

        
		$schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb=0;
        $ttlremaining_balance=0;
        $table = "";

        foreach($schedule as $row){
            if($row['indicatorname'] == 'denda'){
                $denda = $row["remaining_denda"];
            }else{
                $denda = $row["denda_terlambatb"];
            }
            $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
            $table .='<tr>
                        <!--<td>'.$row["scheduletype"].'</td>
                        <td>'.$this->tgl_indo(date('Y-m-d',strtotime($row["duedate"]))).'</td>
                        <td>'.$this->tgl_indo(date('Y-m-d',strtotime($row["payment_date"]))).'</td>
						<td>'.$row["hari_terlambatb"].'</td>
						<td align="right">Rp. '.number_format($row["remaining_balance"]).'</td>                        
                        <td align="right">Rp. '.number_format($denda).'</td>
						<td align="right">Rp. '.number_format($["payment"]).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]+round($denda)).'</td>-->
                    </tr>';
        }

        $table .='<tr><!--<td>&nbsp</td><td>&nbsp</td>--><td>Total </td><td align="right">Rp. '.number_format($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td align="right">Rp. '.number_format($ttldenda_terlambatb).'</td><td align="right">Rp. '.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

        return $table;
    }
	
	public function getHTMLdefault(){
       return $this->getHTML();
    }
    
	public function getHTMLold2($spke=null){

        $tpl1=
        '<style>
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
                <!--<p class="spstyle_p" align="right">Jakarta, <b>{{tanggal_print_w}}</b></p>-->
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p class="spstyle_p">No. Ref : <b>{{nomor_sp_teratas}}</b><br/>
                    Hal : Pemberitahuan ke <b>{{sp_surat_ke}}</b></p><br/> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';
            
            $tpl2 = 
                'Menindaklanjuti <b>Surat Pemberitahuan {{sp_ke_before}}</b> kami tanggal {{sp_date_before}} No. {{sp_no_before}}';

            $tpl3 = 
                'Pertama-tama kami ucapkan terima kasih atas kepercayaan Bapak/Ibu kepada kami dengan memesan rumah/kavling di Blok <b>{{unit_number}}</b> Citra Indah City Jonggol. Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan kewajiban Bapak/Ibu yang telah jatuh tempo berikut ini:
                        </p>        
                        <br/>
			{{{list_tagihan}}}
			{{{pageBreak3}}}   
                        <br/> <p class="spstyle_p">
			Kami mohon agar Bapak/Ibu dapat melunasi kewajiban tersebut dengan cara datang langsung ke kantor Pemasaran Citra Indah City atau transfer ke rekening kami atas nama :<br/>
						{{nama_pt}} <br/>
						{{nama_bank_mandiri}} <br/>
						Acc. {{nomor_acc_mandiri}}<br/>
						ATAU <br/>
                        {{nama_pt}} <br/>
						{{nama_bank_bca}} <br/>
						Acc. {{nomor_acc_bca}} <br/> 
                        </p>
			{{{pageBreak2}}}
                        <p class="spstyle_p">
			Apabila Bapak/Ibu telah menyelesaikan kewajiban tersebut diatas, kami mohon agar bukti pembayarannya dapat di  email ke cs.citraindahcityjonggol@ciputra.com atau wa ke nomor 082260000928 up. Collection atau fax ke nomor 021-89922023 dan surat pemberitahuan ini dapat diabaikan.<br/>
			<br/>
			Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.
                

                 ';

            $tpl6 = ', kami tegaskan kepada Bapak/Ibu selaku pembeli rumah Blok <b>{{unit_number}}</b> kawasan {{cluster}}, bahwa pemesanan rumah tersebut menjadi batal dan kami berhak menjual kembali rumah tersebut kepada pihak lain. 
                     
                    <br/>
					<br/>
                    Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih. ';    

            $tpl4 =  '
                Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu membatalkan pemesanan rumah tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali rumah tersebut kepada pihak lain.
                 <br/><br/>
				 Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.';

            $tpl5 .= '</div>
                <br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
                <br/>
                <br/>
                <br/>
                Agus Sulistiyo (Head Of Finance)<br/>
				--------------------------------------<br/>
				cc : Vivi Riberu<br/>
				{{salesman_name}} (Sales)<br/>
                </p>

                <!--<p class="spstyle_p_small"><u><b>Note</b> : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami. mohon untuk segera menghubungi kami. sehingga kami dapat melakukan pengecekan lebih lanjut.</u></p>-->
                </body>
                ';
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl5;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl3.$tpl5;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl2.$tpl3.$tpl4.$tpl5;
        }
        elseif($spke==4){
            $tpl = $tpl1.$tpl2.$tpl6.$tpl5;
        }else{
            $tpl = $tpl1.$tpl3.$tpl5;
        }
        
        return $tpl;
    }
	public function getHTML($spke=null){

        $tpl1=
        '<style>
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
                <p class="spstyle_p" align="right">Palu, {{tanggal_print_w}}</p>
                <br/>
                <p class="spstyle_p">No. : {{nomor_sp_teratas}}<br/>
                    Hal : Surat Pemberitahuan {{sp_surat_ke}} </p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    <b>Bapak/Ibu {{customer_name}}</b><br/>
                    <b>{{customer_address}}</b></p>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';
            
            $tpl2 = 
                'Menindaklanjuti surat kami sebelumnya nomor {{sp1}} tanggal {{sp1_date}}, dengan ini kami sampaikan bahwa sampai dengan saat ini kami belum menerima pembayaran rumah/kavling di Blok {{unit_number}}. Rincian kewajiban bapak/Ibu sampai dengan saat ini adalah sebagai berikut: </p>        
                        <br/>';

            $tpl3 = 
                'Pertama-tama  kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan  pembelian rumah di CitraLand Palu, kawasan <b>{{cluster}}</b>, blok <b>{{unit_number}}</b>. sesuai dengan Surat Pemesanan Tanah dan Bangunan (SPT) Nomor : <b>{{nomor_sp_teratas}}</b> tanggal <b>{{sp1_date}}</b>. Dengan tidak bermaksud mengganggu kesibukan  Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:
                        </p>        
                        ';
						
			$tpl4 = 
                'Menindaklanjuti surat kami sebelumnya <br/><br/>
				1. Surat Pemberitahuan ke 1 nomor {{sp1}} tanggal {{sp1_date}}<br/>
				2. Surat Pemberitahuan ke 2 nomor {{sp2}} tanggal {{sp2_date}}<br/><br/>
				dengan ini kami sampaikan bahwa sampai dengan saat ini kami belum menerima pembayaran rumah/kavling di Blok {{unit_number}}. Rincian kewajiban bapak/Ibu sampai dengan saat ini adalah sebagai berikut:
                        </p>';
			
			$tpl5 ='Menindaklanjuti surat kami sebelumnya <br/><br/>
			1. Surat Pemberitahuan ke 1 nomor {{sp1}} tanggal {{sp1_date}} <br/>
			2. Surat Pemberitahuan ke 2 nomor {{sp2}} tanggal {{sp2_date}} <br/>
			3. Surat Pemberitahuan ke 3 nomor {{sp3}} tanggal {{sp3_date}} <br/><br/>
			dengan ini kami sampaikan bahwa sampai dengan saat ini kami belum menerima pembayaran rumah/kavling di Blok {{unit_number}}.
			<br/>';
			
			$tpl6 ='<br/>
			{{{list_tagihan}}}
			{{{pageBreak3}}}   
                        <br/> <p class="spstyle_p">
			Kami mohon agar Bapak/Ibu dapat melunasi kewajiban tersebut dengan cara datang langsung ke kantor Pemasaran Citra Indah City atau transfer ke rekening kami atas nama :<br/>
						{{nama_pt}} <br/>
						{{nama_bank_mandiri}} <br/>
						Acc. {{nomor_acc_mandiri}}<br/>
						ATAU <br/>
                        {{nama_pt}} <br/>
						{{nama_bank_bca}} <br/>
						Acc. {{nomor_acc_bca}} <br/> 
                        </p>
			<!--{{{pageBreak2}}}-->';
			
			$tpl7 ='<p class="spstyle_p">
			Apabila Bapak/Ibu telah menyelesaikan kewajiban tersebut diatas, kami mohon agar bukti pembayarannya dapat di  email ke cs.citraindahcityjonggol@ciputra.com atau wa ke nomor 082260000928 up. Collection atau fax ke nomor 021-89922023 dan surat pemberitahuan ini dapat diabaikan.<br/>
			<br/>
			Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.
                 ';
			
			$tpl8 = '<p class="spstyle_p"> Kami berharap agar Bapak/Ibu dapat menyelesaikan kewajiban tersebut diatas selambat-lambatnya tanggal <b>{{tgl_akhir_bayar}}</b>. Jika sampai dengan tanggal tersebut kami belum menerima pembayarannya, dengan sangat menyesal kami anggap Bapak / Ibu telah membatalkan pemesanan rumah/kavling {{unit_number}} Citra Indah City Jonggol dan uang yang telah dibayarkan akan kami perhitungkan sesuai dengan ketentuan pasal 5 PPJB tentang Pembatalan. 
                    <br/>
			Apabila ada hal-hal yang ingin didiskusikan lebih lanjut, kami harap Bapak/Ibu tidak sungkan untuk menghubungi Staff Collection kami di nomor telpon <b>021-89930606/0808</b>
					<br/>
            Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih. ';
			
            $tpl9 = 'Oleh karena itu dengan sangat menyesal kami anggap Bapak / Ibu telah membatalkan pemesanan rumah/kavling di blok {{unit_number}} Citra Indah City Jonggol dan melalui surat ini  kami sampaikan <b>Konfirmasi Pembatalan<b/> unit tersebut. Uang yang telah Bapak/Ibu bayarkan akan kami perhitungkan sesuai dengan ketentuan point V dan pada SPR IX tentang pembatalan dan kami berhak membatalkan sepihak untuk menjual kembali unit tersebut kepada pihak lain. 
            <br/><br/>
            Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih. '; 

            $tpl10 = '</div>
                <!--<br/>-->
                <p class="spstyle_p">
                Hormat Kami,</br>
                <br/>
                <br/>
                <br/>
                Daniel Rumahorbo<br/>
				--------------------------------------<br/>
				<!--cc : Vivi Riberu<br/>-->
				{{salesman_name}} (Sales)<br/>
                </p>

                <!--<p class="spstyle_p_small"><u><b>Note</b> : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami. mohon untuk segera menghubungi kami. sehingga kami dapat melakukan pengecekan lebih lanjut.</u></p>-->
                </body>
                ';
			$tpl11 = '</div>
                <!--<br/>-->
                <p class="spstyle_p">
                Hormat Kami,</br>
                <br/>
                <br/>
                <br/>
                Agus Sulistiyo (Head Of Finance)<br/>
				--------------------------------------<br/>
				<!--cc : Vivi Riberu<br/>-->
				{{salesman_name}} (Sales)<br/>
                </p>

                <!--<p class="spstyle_p_small"><u><b>Note</b> : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami. mohon untuk segera menghubungi kami. sehingga kami dapat melakukan pengecekan lebih lanjut.</u></p>-->
                </body>
                ';
				$tpl12 .= '</div>
                <!--<br/>-->
                <p class="spstyle_p">
                Hormat Kami,</br>
                <br/>
                <br/>
                <br/>
                <!--Agus Sulistiyo (Head Of Finance)<br/>
				-------------------------------------------------<br/>
				cc : Vivi Riberu<br/>
				{{salesman_name}} (Sales)<br/>-->
				Agus Sulistiyo (Head Of Finance)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vivi Riberu (Dept. Head Marketing & Sales)<br/>
				--------------------------------------------------------<br/>
				<!--<br/>
                <br/>
                <br/>
				
				Vivi Riberu<br/>
				--------------------------------------<br/>-->
				{{salesman_name}} (Sales)<br/>
			    </p>

                <!--<p class="spstyle_p_small"><u><b>Note</b> : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami. mohon untuk segera menghubungi kami. sehingga kami dapat melakukan pengecekan lebih lanjut.</u></p>-->
                </body>
                ';
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl6.$tpl7.$tpl10;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl6.$tpl7.$tpl10;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl4.$tpl6.$tpl8.$tpl11;
        }
        elseif($spke==4){
            $tpl = $tpl1.$tpl5.$tpl9.$tpl12;
        }else{
            $tpl = $tpl1.$tpl3.$tpl6.$tpl7.$tpl10;
        }
        
        return $tpl;
    }
}
