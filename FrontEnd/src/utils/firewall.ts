// Firewall security implementation
export class Firewall {
  private static instance: Firewall;
  private blockedIPs: Set<string> = new Set();
  private requestCounts: Map<string, number> = new Map();
  private readonly MAX_REQUESTS_PER_MINUTE = 100;
  private readonly BLOCK_DURATION = 3600000; // 1 hour in milliseconds

  private constructor() {}

  static getInstance(): Firewall {
    if (!Firewall.instance) {
      Firewall.instance = new Firewall();
    }
    return Firewall.instance;
  }

  // Check for malicious patterns in requests
  private checkForMaliciousPatterns(url: string, headers: Headers): boolean {
    const maliciousPatterns = [
      /\.\.\//, // Directory traversal
      /<script>/, // XSS attempts
      /exec\(/, // Command injection
      /eval\(/, // Code injection
      /union\s+select/i, // SQL injection
      /document\.cookie/i, // Cookie theft attempts
    ];

    const urlToCheck = url.toLowerCase();
    const headersToCheck = Array.from(headers.entries())
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')
      .toLowerCase();

    return maliciousPatterns.some(pattern => 
      pattern.test(urlToCheck) || pattern.test(headersToCheck)
    );
  }

  // Validate request origin
  private validateOrigin(origin: string | null): boolean {
    if (!origin) return true; // Allow same-origin requests
    const allowedOrigins = [
      'http://localhost:5173',
      'https://yourdomain.com' // Add your production domain
    ];
    return allowedOrigins.includes(origin);
  }

  // Rate limiting
  private checkRateLimit(ip: string): boolean {
    const count = this.requestCounts.get(ip) || 0;
    
    if (count >= this.MAX_REQUESTS_PER_MINUTE) {
      this.blockedIPs.add(ip);
      setTimeout(() => {
        this.blockedIPs.delete(ip);
        this.requestCounts.delete(ip);
      }, this.BLOCK_DURATION);
      return false;
    }

    this.requestCounts.set(ip, count + 1);
    return true;
  }

  // Main security check method
  public async checkRequest(request: Request): Promise<boolean> {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check if IP is blocked
    if (this.blockedIPs.has(ip)) {
      throw new Error('Access denied: IP is blocked');
    }

    // Check rate limit
    if (!this.checkRateLimit(ip)) {
      throw new Error('Too many requests. Please try again later.');
    }

    // Check for malicious patterns
    if (this.checkForMaliciousPatterns(request.url, request.headers)) {
      this.blockedIPs.add(ip);
      throw new Error('Access denied: Malicious request detected');
    }

    // Validate origin
    if (!this.validateOrigin(request.headers.get('origin'))) {
      throw new Error('Access denied: Invalid origin');
    }

    return true;
  }

  // Reset rate limiting for testing
  public resetRateLimit(ip: string): void {
    this.requestCounts.delete(ip);
    this.blockedIPs.delete(ip);
  }
} 