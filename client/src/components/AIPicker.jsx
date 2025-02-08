import React, { useState } from 'react';
import CustomButton from './CustomButton';

const AIPicker = ({ prompt, setPrompt, handleSubmit }) => {
  const [generatingImg, setGeneratingImg] = useState(false);
  const [error, setError] = useState(null);

  const handleAIRequest = async (type) => {
    if (!prompt) return alert('Please enter a prompt');
    
    try {
      setError(null); // پاک کردن خطای قبلی در صورت موفقیت
      setGeneratingImg(true); // نمایش وضعیت در حال بارگذاری

      // اگر بخش فعال نشده باشد، پیامی نمایش داده می‌شود
      if (type === 'logo') {
        setError('This feature is coming soon.');
        return;
      }

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Something went wrong');
      }

      // اگر پاسخ درست باشد، ادامه دهید
      handleSubmit(type, `data:image/png;base64,${data.photo}`);
      
    } catch (error) {
      // در صورت وقوع خطا، آن را در وضعیت خطا ذخیره می‌کنیم
      setError(`Error: ${error.message}. Response: ${JSON.stringify(error.response)}`);
    } finally {
      setGeneratingImg(false); // بعد از دریافت پاسخ، بارگذاری تمام می‌شود
    }
  };

  return (
    <div className="aipicker-container">
      <textarea 
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />
      
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton 
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton 
              type="outline"
              title="AI Logo"
              handleClick={() => handleAIRequest('logo')}
              customStyles="text-xs"
            />

            <CustomButton 
              type="filled"
              title="AI Full"
              handleClick={() => handleAIRequest('full')}
              customStyles="text-xs"
            />
          </>
        )}
      </div>

      {/* نمایش پیامی که ویژگی بزودی اضافه می‌شود */}
      {error && (
        <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
          <strong>{error}</strong>
        </div>
      )}
    </div>
  );
};

export default AIPicker;
