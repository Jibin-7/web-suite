/**
 * ==========================================================================
 * Task 1: JavaScript Form Validation & Security Logic
 * Handles email and password validation rules, strength indicator updates,
 * and browser alert notifications upon form submission.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const termsCheck = document.getElementById('termsCheck');
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const eyeIcon = document.getElementById('eyeIcon');
    
    // Form groups and error text elements
    const groupEmail = document.getElementById('group-email');
    const emailError = document.getElementById('emailError');
    const groupPassword = document.getElementById('group-password');
    const passwordError = document.getElementById('passwordError');
    
    // Password Strength UI
    const strengthContainer = document.getElementById('strengthContainer');
    const strengthText = document.getElementById('strengthText');
    
    // Validation Spec Rule Items
    const ruleEmail = document.getElementById('rule-email');
    const ruleLen = document.getElementById('rule-len');
    const ruleUpper = document.getElementById('rule-upper');
    const ruleNum = document.getElementById('rule-num');
    const ruleTerms = document.getElementById('rule-terms');
    
    // Sample Data Helper Buttons
    const fillDemoBtn = document.getElementById('fillDemoBtn');
    const triggerErrorBtn = document.getElementById('triggerErrorBtn');
    
    // Toast Elements
    const toast = document.getElementById('toast');
    const closeToast = document.getElementById('closeToast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const upperRegex = /[A-Z]/;
    const numRegex = /[0-9]/;

    /* ==========================================================================
       1. Password Visibility Toggle
       ========================================================================== */
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        if (type === 'text') {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
            togglePasswordBtn.setAttribute('aria-label', 'Hide password');
        } else {
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
            togglePasswordBtn.setAttribute('aria-label', 'Show password');
        }
    });

    /* ==========================================================================
       2. Real-Time Email Validation
       ========================================================================== */
    const validateEmail = () => {
        const val = emailInput.value.trim();
        const isValid = emailRegex.test(val);

        if (val === '') {
            groupEmail.classList.remove('success', 'error');
            emailError.textContent = 'Email address is required.';
            updateRuleState(ruleEmail, null);
            return false;
        }

        if (isValid) {
            groupEmail.classList.remove('error');
            groupEmail.classList.add('success');
            updateRuleState(ruleEmail, true);
            return true;
        } else {
            groupEmail.classList.remove('success');
            groupEmail.classList.add('error');
            emailError.textContent = 'Please enter a valid email address (e.g., name@domain.com).';
            updateRuleState(ruleEmail, false);
            return false;
        }
    };

    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);

    /* ==========================================================================
       3. Real-Time Password Validation & Strength Meter
       ========================================================================== */
    const validatePassword = () => {
        const val = passwordInput.value;
        let score = 0;
        let errors = [];

        // Check length
        const hasLen = val.length >= 8;
        if (hasLen) {
            score++;
            updateRuleState(ruleLen, true);
        } else {
            errors.push('at least 8 characters');
            updateRuleState(ruleLen, val.length > 0 ? false : null);
        }

        // Check uppercase
        const hasUpper = upperRegex.test(val);
        if (hasUpper) {
            score++;
            updateRuleState(ruleUpper, true);
        } else {
            errors.push('1 uppercase letter');
            updateRuleState(ruleUpper, val.length > 0 ? false : null);
        }

        // Check numeric digit
        const hasNum = numRegex.test(val);
        if (hasNum) {
            score++;
            updateRuleState(ruleNum, true);
        } else {
            errors.push('1 number');
            updateRuleState(ruleNum, val.length > 0 ? false : null);
        }

        // Check special characters for extra score
        if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
            score++;
        }

        // Update Strength UI
        strengthContainer.className = 'password-strength-container';
        if (val.length === 0) {
            strengthText.textContent = 'None';
            groupPassword.classList.remove('success', 'error');
            return false;
        }

        if (score === 1) {
            strengthContainer.classList.add('strength-1');
            strengthText.textContent = 'Weak';
        } else if (score === 2) {
            strengthContainer.classList.add('strength-2');
            strengthText.textContent = 'Fair';
        } else if (score === 3) {
            strengthContainer.classList.add('strength-3');
            strengthText.textContent = 'Good';
        } else if (score >= 4) {
            strengthContainer.classList.add('strength-4');
            strengthText.textContent = 'Strong 🔥';
        }

        // Determine validity based on required rules
        const isRequiredValid = hasLen && hasUpper && hasNum;
        if (isRequiredValid) {
            groupPassword.classList.remove('error');
            groupPassword.classList.add('success');
            return true;
        } else {
            groupPassword.classList.remove('success');
            if (val.length > 0) {
                groupPassword.classList.add('error');
                passwordError.textContent = `Password requires: ${errors.join(', ')}.`;
            }
            return false;
        }
    };

    passwordInput.addEventListener('input', validatePassword);
    passwordInput.addEventListener('blur', validatePassword);

    /* ==========================================================================
       4. Terms Checkbox Validation
       ========================================================================== */
    termsCheck.addEventListener('change', () => {
        updateRuleState(ruleTerms, termsCheck.checked);
    });

    /* ==========================================================================
       5. Helper: Update Rule Item UI
       ========================================================================== */
    function updateRuleState(element, isValid) {
        if (!element) return;
        element.classList.remove('valid', 'invalid');
        if (isValid === true) {
            element.classList.add('valid');
        } else if (isValid === false) {
            element.classList.add('invalid');
        }
    }

    /* ==========================================================================
       6. Form Submission & Alert Notifications
       ========================================================================== */
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isTermsChecked = termsCheck.checked;
        updateRuleState(ruleTerms, isTermsChecked);

        let errorList = [];

        if (!isEmailValid) {
            if (emailInput.value.trim() === '') {
                errorList.push('• Email address field cannot be empty.');
            } else {
                errorList.push('• Please enter a valid email address format.');
            }
        }

        if (!isPasswordValid) {
            const val = passwordInput.value;
            if (val === '') {
                errorList.push('• Password field cannot be empty.');
            } else {
                let missing = [];
                if (val.length < 8) missing.push(`needs ${8 - val.length} more characters`);
                if (!upperRegex.test(val)) missing.push('missing uppercase letter');
                if (!numRegex.test(val)) missing.push('missing numeric digit');
                errorList.push(`• Password does not meet requirements (${missing.join('; ')}).`);
            }
        }

        if (!isTermsChecked) {
            errorList.push('• You must check and agree to the Terms of Service.');
        }

        if (errorList.length > 0) {
            const alertMsg = `⚠️ Form Validation Error(s):\n\nPlease fix the following issues:\n\n${errorList.join('\n\n')}`;
            alert(alertMsg);
            
            if (!isEmailValid) {
                emailInput.focus();
            } else if (!isPasswordValid) {
                passwordInput.focus();
            }
        } else {
            const emailVal = emailInput.value.trim();
            const successMsg = `🎉 Login Successful!\n\nWelcome back, ${emailVal}!\n\nAll validation checks have passed successfully:\n✔ Valid email format\n✔ Secure password criteria met\n✔ Terms of Service agreed`;
            
            alert(successMsg);

            showToast('Login Successful', `Welcome back, ${emailVal}! Validation checks passed.`);

            setTimeout(() => {
                loginForm.reset();
                groupEmail.classList.remove('success', 'error');
                groupPassword.classList.remove('success', 'error');
                strengthContainer.className = 'password-strength-container';
                strengthText.textContent = 'None';
                [ruleEmail, ruleLen, ruleUpper, ruleNum, ruleTerms].forEach(el => el.classList.remove('valid', 'invalid'));
            }, 3000);
        }
    });

    /* ==========================================================================
       7. Sample Data Helper Buttons
       ========================================================================== */
    if (fillDemoBtn) {
        fillDemoBtn.addEventListener('click', () => {
            emailInput.value = 'student.dev@example.com';
            passwordInput.value = 'WebDev2026!';
            termsCheck.checked = true;

            validateEmail();
            validatePassword();
            updateRuleState(ruleTerms, true);

            showToast('Sample Data Loaded', 'Valid email and password filled automatically.');
        });
    }

    if (triggerErrorBtn) {
        triggerErrorBtn.addEventListener('click', () => {
            emailInput.value = 'invalid.email-address';
            passwordInput.value = 'short1';
            termsCheck.checked = false;

            validateEmail();
            validatePassword();
            updateRuleState(ruleTerms, false);

            showToast('Invalid Data Loaded', 'Click "Sign In" to test the error alert popup.');
        });
    }

    /* ==========================================================================
       8. Toast Notification Logic
       ========================================================================== */
    function showToast(title, message) {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    if (closeToast) {
        closeToast.addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }
});
