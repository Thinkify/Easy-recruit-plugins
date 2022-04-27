(function () {
  'use strict';
  window.addEventListener(
    'load',
    function () {
      var form = document.getElementById('needs-validation');
      var submitButton = $('#submitButton');
      var loadingSubmitButton = $('#loadingSubmitButton');
      var addingFormView = $('#addingFormView');
      var successView = $('#successView');
      var errorView = $('#errorView');

      var resetForm = function () {
        $('#name').val('');
        $('#email').val('');
        $('#linkedInProfile').val('');
        $('#gitHub').val('');
        $('#contact').val('');
        $('#currentSalary').val('');
        $('#expectedSalary').val('');
        $('#noticePeriod').val('');
        $('#needs-validation').removeClass('was-validated');
      };

      var startLoading = function () {
        submitButton.addClass('d-none');
        loadingSubmitButton.removeClass('d-none');
      };

      var stopLoading = function () {
        loadingSubmitButton.addClass('d-none');
        submitButton.removeClass('d-none');
      };

      var showSuccessForm = function () {
        stopLoading();
        addingFormView.addClass('d-none');
        errorView.addClass('d-none');
        successView.removeClass('d-none');
      };

      var showErrorForm = function () {
        stopLoading();
        addingFormView.addClass('d-none');
        successView.addClass('d-none');
        errorView.removeClass('d-none');
      };

      var showFormOnly = function () {
        stopLoading();
        addingFormView.removeClass('d-none');
        errorView.addClass('d-none');
        successView.addClass('d-none');
      };

      form.addEventListener(
        'submit',
        function (event) {
          form.classList.add('was-validated');
          startLoading();
          event.preventDefault();
          event.stopPropagation();
          if (form.checkValidity() === false) {
            stopLoading();
            return;
          }
          if (form.checkValidity()) {
            const formData = {
              name: $('#name').val(),
              email: $('#email').val(),
              linkedInProfile: $('#linkedInProfile').val(),
              gitHub: $('#gitHub').val(),
              contact: $('#contact').val(),
              currentSalary: $('#currentSalary').val(),
              expectedSalary: $('#expectedSalary').val(),
              noticePeriod: $('#noticePeriod').val(),
            };

            fetch(`${getConfig().B_PROD_URL}/candidates/addcandidate`, {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
              body: JSON.stringify(formData),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data);
                showSuccessForm();
                $('#addMoreButton').click(function () {
                  showFormOnly();
                  resetForm();
                });
                alert('Success:');
              })
              .catch((error) => {
                console.error('Error:', error);
                showErrorForm();
                alert('Error:');
              });
          }
        },
        false
      );
    },
    false
  );
})();

// email
