(function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener('submit', function(event) {
                if (this.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                this.classList.add('was-validated');
            }, false);
        }
    }, false);
})();

function toggleExperienceFields() {
    const hasExperience = document.getElementById("hasExperience").value;
    const experienceFields = document.getElementById("experience-fields");
    experienceFields.style.display = hasExperience === "yes" ? "block" : "none";
}

function addEducation() {
    const educationContainer = document.getElementById("education-container");
    const newEducationItem = document.createElement("div");
    newEducationItem.className = "education-item mb-3";
    newEducationItem.innerHTML = `
        <label for="educationYear" class="form-label">Year</label>
        <input type="text" class="form-control mb-2" placeholder="Enter the year" required>
        <label for="educationType" class="form-label">Type of Education</label>
        <input type="text" class="form-control mb-2" placeholder="Enter the type of education" required>
        <label for="educationPlace" class="form-label">Place of Education</label>
        <input type="text" class="form-control mb-2" placeholder="Enter the place of education" required>
        <label for="educationResult" class="form-label">Result</label>
        <input type="text" class="form-control mb-2" placeholder="Enter the result" required>
    `;
    educationContainer.appendChild(newEducationItem);
}

function generateResume() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const socialMedia = document.getElementById("socialMedia").value;
    const personalDescription = document.getElementById("personalDescription").value;
    const softSkills = document.getElementById("softSkills").value;
    const skills = document.getElementById("skills").value;
    const certificates = document.getElementById("certificates").value;
    const involvement = document.getElementById("involvement").value;
    const hasExperience = document.getElementById("hasExperience").value;
    const experienceDescription = hasExperience === "yes" ? document.getElementById("experienceDescription").value : "No work experience.";
    const jobType = hasExperience === "yes" ? document.getElementById("jobType").value : "";
    const duration = hasExperience === "yes" ? document.getElementById("duration").value : "";

    let educationList = "";
    const educationItems = document.querySelectorAll(".education-item");
    educationItems.forEach(item => {
        const year = item.querySelector("input[placeholder='Enter the year']").value;
        const type = item.querySelector("input[placeholder='Enter the type of education']").value;
        const place = item.querySelector("input[placeholder='Enter the place of education']").value;
        const result = item.querySelector("input[placeholder='Enter the result']").value;
        educationList += `<li>${year} - ${type} at ${place} (Result: ${result})</li>`;
    });

    const profilePicture = document.getElementById("profilePicture").files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const output = document.getElementById("resume-output");
        output.innerHTML = `
            <div style="text-align: center;">
                <img src="${e.target.result}" alt="Profile Picture">
                <h2>${name}</h2>
                <p>${email} | ${phone} | ${address}</p>
                <p>Social Media: ${socialMedia}</p>
                <h4>Personal Description</h4>
                <p>${personalDescription}</p>
                <h4>Soft Skills</h4>
                <p>${softSkills}</p>
                <h4>Technical Skills</h4>
                <p>${skills}</p>
                <h4>Certificates</h4>
                <p>${certificates}</p>
                <h4>Involvement</h4>
                <p>${involvement}</p>
            </div>
            <h4>Work Experience</h4>
            <p><strong>Job Type:</strong> ${jobType}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>Description:</strong> ${experienceDescription}</p>
            <h4>Education</h4>
            <ul>${educationList}</ul>
        `;
    };
    reader.readAsDataURL(profilePicture);
}

function downloadResume() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const resumeContent = document.getElementById("resume-output").innerHTML;
    doc.fromHTML(resumeContent, 15, 15);
    doc.save("resume.pdf");
}
