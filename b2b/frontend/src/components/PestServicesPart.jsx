import './PestManagement.css';
import gss4dImg from '../assets/gss4d.png';
import birdProImg from '../assets/birdpro.png';
import ipmImg from '../assets/ipm.png';

export default function PestManagement() {
  return (
    <section className="pest-management">
      <div className="management-header">
        <h2>Popular Home Pest Control Services</h2>
      </div>
      <div className="management-cards">
        {/* Card 1 */}
        <div className="management-card">
          <div className="card-image-container">
            <img src={gss4dImg} alt="GoldSeal Service 4D" className="card-image" />
          </div>
          <div className="card-content">
            <h3>6D Prime – Cockroach & Ant Control</h3>
            <ul className="card-features">
              <li>Detect – Inspect and identify infestation points</li>
              <li>Diagnose – Find root causes and entry areas</li>
              <li>Deny Entry – Seal gaps and cracks to block pests</li>
              <li>Deny Shelter – Remove nesting and hiding zones</li>
              <li>Deny Food – Eliminate access to food and moisture</li>
              <li>Destroy – Use targeted treatment for total control</li>
            </ul>
            <a 
              href="https://hommlie.com/product/761/6d-prime-cockroach-control-and-ant-control" 
              className="card-link"
              target="_blank" 
              rel="noopener noreferrer"
            >
              View more →
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="management-card">
          <div className="card-image-container">
            <img src={birdProImg} alt="Bird Pro" className="card-image" />
          </div>
          <div className="card-content">
            <h3>BirdPro – Safe & Humane Bird Control</h3>
            <ul className="card-features">
              <li>Netting – Heavy-duty nets to block entry points</li>
              <li>Spikes – Anti-roosting spikes for ledges and beams</li>
              <li>Repellents – Visual and physical deterrents</li>
              <li>No Harm – 100% safe for birds and compliant</li>
              <li>Low Maintenance – Long-lasting, weather-resistant setups</li>
              <li>Custom Fit – Tailored for your site and structure</li>
            </ul>
            <a 
              href="https://hommlie.com/bird-control/28" 
              className="card-link"
              target="_blank" 
              rel="noopener noreferrer"
            >
              View more →
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="management-card">
          <div className="card-image-container">
            <img src={ipmImg} alt="Integrated Pest Management" className="card-image" />
          </div>
          <div className="card-content">
            <h3>EcoGuard – Integrated Pest Management (IPM)</h3>
            <ul className="card-features">
              <li>Monitor – Regular inspections to detect early signs</li>
              <li>Assess – Analyze pest trends and risk zones</li>
              <li>Prevent – Block entry points and remove attractants</li>
              <li>Target – Apply focused treatments only where needed</li>
              <li>Reduce – Minimize chemical use with eco-safe options</li>
              <li>Sustain – Long-term protection through proactive planning</li>
            </ul>
            <a href="#" className="card-link">View more →</a>
          </div>
        </div>
      </div>
    </section>
  );
}