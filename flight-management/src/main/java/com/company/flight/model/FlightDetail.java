package com.company.flight.model;

import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class FlightDetail {

	private Integer flightNumber;
	private String carrier;
	private String origin;
	private Date departure;
	private String destination;
	private Date arrival;
	private String aircraft;
	private Long distance;
	private Integer travelTime;
	private String status;

	public int getFlightNumber() {
		return flightNumber;
	}

	public void setFlightNumber(int flightNumber) {
		this.flightNumber = flightNumber;
	}

	public String getCarrier() {
		return carrier;
	}

	public void setCarrier(String carrier) {
		this.carrier = carrier;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public Date getDeparture() {
		return departure;
	}

	public void setDeparture(Date departure) {
		this.departure = departure;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public Date getArrival() {
		return arrival;
	}

	public void setArrival(Date arrival) {
		this.arrival = arrival;
	}

	public String getAircraft() {
		return aircraft;
	}

	public void setAircraft(String aircraft) {
		this.aircraft = aircraft;
	}

	public Long getDistance() {
		return distance;
	}

	public void setDistance(Long distance) {
		this.distance = distance;
	}

	public Integer getTravelTime() {
		return travelTime;
	}

	public void setTravelTime(Integer travelTime) {
		this.travelTime = travelTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}