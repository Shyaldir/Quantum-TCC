document.addEventListener('DOMContentLoaded', function() {
    // Initialize Google Map
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.6868, lng: -46.6228 }, // Diadema coordinates
        zoom: 14,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#242f3e"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"color": "#242f3e"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#746855"}]
            }
        ]
    });

    // Add marker for company location
    const companyMarker = new google.maps.Marker({
        position: { lat: -23.68430, lng: -46.62033 },
        map: map,
        title: 'Quantum'
    });

    // CEP Validation
    const cepInput = document.getElementById('cep');
    const cepResult = document.getElementById('cep-result');

    cepInput.addEventListener('input', function(e) {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        
        e.target.value = value;
    });

    cepInput.addEventListener('blur', async function(e) {
        const cep = e.target.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            showCepResult('CEP inválido', false);
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                showCepResult('CEP não encontrado', false);
                return;
            }

            // Check if address is within service area (example: Diadema and surrounding cities)
            const isInServiceArea = checkServiceArea(data.localidade);
            
            if (isInServiceArea) {
                showCepResult(`Ótimo! Atendemos sua região em ${data.localidade}`, true);
                
                // Add marker for searched location
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    address: `${data.logradouro}, ${data.localidade}, ${data.uf}`
                }, function(results, status) {
                    if (status === 'OK') {
                        const marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            icon: {
                                url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                            }
                        });
                        
                        map.setCenter(results[0].geometry.location);
                    }
                });
            } else {
                showCepResult(`Desculpe, ainda não atendemos ${data.localidade}`, false);
            }
        } catch (error) {
            showCepResult('Erro ao consultar CEP', false);
        }
    });

    function showCepResult(message, isSuccess) {
        cepResult.textContent = message;
        cepResult.style.display = 'block';
        cepResult.style.backgroundColor = isSuccess ? '#e8f5e9' : '#ffebee';
        cepResult.style.color = isSuccess ? '#2e7d32' : '#c62828';
    }

    function checkServiceArea(city) {
        const serviceAreas = [
            'Diadema',
            'São Paulo',
            'São Bernardo do Campo',
            'Santo André',
            'São Caetano do Sul'
        ];
        return serviceAreas.includes(city);
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        } catch (error) {
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        }
    });
});