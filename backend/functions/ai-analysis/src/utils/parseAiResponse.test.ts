import parseAiResponse from './parseAiResponse';

test('parses aiResponse correctly', () => {
  const str = `- Blood pressure fluctuates within normal range.  
- Pulse rate shows slight variability over time.  
- Diastolic pressure remains consistently within healthy levels.  
- Maintain regular physical activity for heart health.  
- Monitor stress levels to manage blood pressure.  
- Ensure balanced diet to support cardiovascular health.`;

  const expectedArray = [
    'Blood pressure fluctuates within normal range.',
    'Pulse rate shows slight variability over time.',
    'Diastolic pressure remains consistently within healthy levels.',
    'Maintain regular physical activity for heart health.',
    'Monitor stress levels to manage blood pressure.',
    'Ensure balanced diet to support cardiovascular health.',
  ];

  expect(parseAiResponse(str)).toEqual(expectedArray);
});
