// Temporary solution using local JSON data
const fetchLocalData = async () => {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching local data:', error);
    throw error;
  }
};

export const fetchCompanies = async () => {
  try {
    const data = await fetchLocalData();
    return data.companies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

export const fetchCompanyDetails = async (id) => {
  try {
    const data = await fetchLocalData();
    const company = data.companies.find(c => c.id === id);
    if (!company) throw new Error('Company not found');
    return company;
  } catch (error) {
    console.error('Error fetching company details:', error);
    throw error;
  }
};

export const fetchJobs = async () => {
  try {
    const data = await fetchLocalData();
    return data.companies.flatMap(company => 
      company.jobs.map(job => ({
        ...job,
        companyName: company.name,
        companyLogo: company.logo
      }))
    );
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const fetchJobDetails = async (id) => {
  try {
    const data = await fetchLocalData();
    for (const company of data.companies) {
      const job = company.jobs.find(j => j.id === id);
      if (job) {
        return {
          ...job,
          companyName: company.name,
          companyLogo: company.logo
        };
      }
    }
    throw new Error('Job not found');
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error;
  }
}; 