import React from 'react'

export default function AboutUs() {
    return (
        <div className='about-us'>
            <div class="container
                    w-100 p-3 mt-5 bg-light text-dark rounded-3 shadow-lg bg-gradient 
            ">
                <div class="row
                 p-3 m-3  
                ">
                    <div class="col-md-6
                        p-3  
                    ">
                        <h2>About Us</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl id aliquet tincidunt, nunc nunc tincidunt nunc, ac tincidunt risus nunc id lectus.</p>
                        <p>Phasellus euismod, mauris id lacinia ultrices, nunc nunc tincidunt nunc, ac tincidunt risus nunc id lectus.</p>
                    </div>
                    <div class="col-md-6
                            
                    ">
                        <img src="https://static.wixstatic.com/media/11062b_61558372520445139c0be500ba546c4df000.jpg/v1/fill/w_489,h_617,al_c,q_80,usm_0.33_1.00_0.00,enc_auto/11062b_61558372520445139c0be500ba546c4df000.jpg" alt="About Us Image" class="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
}
