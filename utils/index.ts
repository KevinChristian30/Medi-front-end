export function dateToAge(date: Date) : number {
  const now = new Date();
  let years = now.getFullYear() - date.getFullYear();

  if (now.getMonth() < date.getMonth() || 
      now.getMonth() == date.getMonth() && now.getDate() < date.getDate()
    ) {
    years--;
  }

  return years;
}

export function calculateBMI(weight: number, heightInCM: number) : number {
  const heightInM: number = heightInCM / 100;

  return weight / (heightInM * heightInM);
}

export function toBMICategory(BMI: number) : string {
  if (BMI < 18.5) return 'Underweight';
  else if (BMI < 24.9) return 'Healthy Weight';
  else if (BMI < 29.0) return 'Overweight';
  return 'Obesity';
}